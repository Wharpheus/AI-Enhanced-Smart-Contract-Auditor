from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
import subprocess
import tempfile
import os
import json
import re
from datetime import datetime
import requests
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

# Configure OpenAI
openai.api_key = os.getenv('NEW_VARIABLE_NAME')

class SmartContractAuditor:
    def __init__(self):
        self.analysis_results = {}
    
    def analyze_syntax(self, code):
        """Basic Solidity syntax validation"""
        try:
            # Check for basic Solidity structure
            if 'pragma solidity' not in code:
                return {'valid': False, 'error': 'Missing pragma directive'}
            
            if 'contract' not in code:
                return {'valid': False, 'error': 'No contract definition found'}
            
            return {'valid': True, 'message': 'Syntax appears valid'}
        except Exception as e:
            return {'valid': False, 'error': str(e)}
    
    def run_slither_analysis(self, code):
        """Run Slither static analysis"""
        try:
            # Create temporary file
            with tempfile.NamedTemporaryFile(mode='w', suffix='.sol', delete=False) as f:
                f.write(code)
                temp_file = f.name
            
            # Run Slither
            result = subprocess.run(
                ['slither', temp_file, '--json', '-'],
                capture_output=True,
                text=True,
                timeout=30
            )
            
            # Clean up
            os.unlink(temp_file)
            
            if result.returncode == 0:
                try:
                    slither_output = json.loads(result.stdout)
                    return self.parse_slither_results(slither_output)
                except json.JSONDecodeError:
                    return {'issues': [], 'error': 'Failed to parse Slither output'}
            else:
                return {'issues': [], 'error': result.stderr}
                
        except subprocess.TimeoutExpired:
            return {'issues': [], 'error': 'Slither analysis timed out'}
        except Exception as e:
            return {'issues': [], 'error': str(e)}
    
    def parse_slither_results(self, slither_output):
        """Parse Slither analysis results"""
        issues = []
        
        if 'results' in slither_output:
            for detector in slither_output['results'].get('detectors', []):
                issue = {
                    'severity': detector.get('impact', 'medium'),
                    'title': detector.get('check', 'Unknown'),
                    'description': detector.get('description', ''),
                    'line': detector.get('line', 0),
                    'fix': self.generate_fix_suggestion(detector.get('check', ''))
                }
                issues.append(issue)
        
        return {'issues': issues}
    
    def generate_fix_suggestion(self, issue_type):
        """Generate fix suggestions based on issue type"""
        fixes = {
            'reentrancy': 'Use ReentrancyGuard modifier and follow checks-effects-interactions pattern',
            'unchecked-transfer': 'Check return values of external calls',
            'unchecked-low-level-call': 'Check return values of low-level calls',
            'unchecked-send': 'Check return values of send operations',
            'uninitialized-state': 'Initialize state variables in constructor',
            'uninitialized-local': 'Initialize local variables before use',
            'unused-return': 'Check return values of external calls',
            'unused-state': 'Remove unused state variables',
            'unused-return': 'Use return values or remove unused returns',
            'costly-loop': 'Optimize loops to reduce gas costs',
            'dead-code': 'Remove dead code to reduce contract size'
        }
        return fixes.get(issue_type.lower(), 'Review and fix according to best practices')
    
    def analyze_with_gpt4(self, code):
        """Analyze contract with GPT-4"""
        try:
            prompt = f"""
            Analyze this Solidity smart contract for security vulnerabilities and best practices.
            Provide a detailed analysis including:
            1. Security vulnerabilities (critical, high, medium, low)
            2. Gas optimization opportunities
            3. Best practices violations
            4. Specific line numbers and fixes
            
            Contract code:
            {code}
            
            Format your response as JSON with the following structure:
            {{
                "vulnerabilities": [
                    {{
                        "severity": "critical|high|medium|low",
                        "title": "Vulnerability title",
                        "description": "Detailed description",
                        "line": line_number,
                        "fix": "Suggested fix"
                    }}
                ],
                "gas_optimizations": [
                    {{
                        "title": "Optimization title",
                        "description": "Description",
                        "line": line_number,
                        "savings": "Estimated gas savings"
                    }}
                ],
                "best_practices": [
                    {{
                        "title": "Practice title",
                        "description": "Description",
                        "line": line_number
                    }}
                ]
            }}
            """
            
            response = openai.ChatCompletion.create(
                model="gpt-4",
                messages=[
                    {"role": "system", "content": "You are a smart contract security expert. Analyze Solidity contracts for vulnerabilities and provide specific, actionable recommendations."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=2000,
                temperature=0.1
            )
            
            # Parse GPT response
            try:
                gpt_analysis = json.loads(response.choices[0].message.content)
                return gpt_analysis
            except json.JSONDecodeError:
                # Fallback if JSON parsing fails
                return {
                    "vulnerabilities": [],
                    "gas_optimizations": [],
                    "best_practices": [],
                    "raw_response": response.choices[0].message.content
                }
                
        except Exception as e:
            return {
                "vulnerabilities": [],
                "gas_optimizations": [],
                "best_practices": [],
                "error": str(e)
            }
    
    def generate_report(self, code, slither_results, gpt_results):
        """Generate comprehensive audit report"""
        all_vulnerabilities = []
        
        # Add Slither results
        if 'issues' in slither_results:
            for issue in slither_results['issues']:
                all_vulnerabilities.append({
                    'source': 'Slither',
                    'severity': issue['severity'],
                    'title': issue['title'],
                    'description': issue['description'],
                    'line': issue['line'],
                    'fix': issue['fix']
                })
        
        # Add GPT results
        if 'vulnerabilities' in gpt_results:
            for vuln in gpt_results['vulnerabilities']:
                all_vulnerabilities.append({
                    'source': 'GPT-4',
                    'severity': vuln['severity'],
                    'title': vuln['title'],
                    'description': vuln['description'],
                    'line': vuln['line'],
                    'fix': vuln['fix']
                })
        
        # Calculate security score
        severity_weights = {'critical': 10, 'high': 7, 'medium': 4, 'low': 1}
        total_score = 100
        
        for vuln in all_vulnerabilities:
            weight = severity_weights.get(vuln['severity'], 1)
            total_score -= weight
        
        security_score = max(0, total_score)
        
        return {
            'security_score': security_score,
            'vulnerabilities': all_vulnerabilities,
            'gas_optimizations': gpt_results.get('gas_optimizations', []),
            'best_practices': gpt_results.get('best_practices', []),
            'summary': {
                'total_issues': len(all_vulnerabilities),
                'critical_issues': len([v for v in all_vulnerabilities if v['severity'] == 'critical']),
                'high_issues': len([v for v in all_vulnerabilities if v['severity'] == 'high']),
                'medium_issues': len([v for v in all_vulnerabilities if v['severity'] == 'medium']),
                'low_issues': len([v for v in all_vulnerabilities if v['severity'] == 'low'])
            }
        }

auditor = SmartContractAuditor()

@app.route('/api/audit', methods=['POST'])
def audit_contract():
    try:
        data = request.get_json()
        code = data.get('code', '')
        
        if not code.strip():
            return jsonify({'error': 'No contract code provided'}), 400
        
        # Step 1: Syntax Analysis
        syntax_result = auditor.analyze_syntax(code)
        
        # Step 2: Slither Analysis
        slither_result = auditor.run_slither_analysis(code)
        
        # Step 3: GPT-4 Analysis
        gpt_result = auditor.analyze_with_gpt4(code)
        
        # Step 4: Generate Report
        report = auditor.generate_report(code, slither_result, gpt_result)
        
        return jsonify({
            'success': True,
            'report': report,
            'processing_time': 1.8,  # Mock processing time
            'confidence': 92  # Mock confidence score
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy', 'timestamp': datetime.now().isoformat()})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000) 