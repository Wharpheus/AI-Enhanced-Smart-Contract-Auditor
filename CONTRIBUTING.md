# 🤝 Contributing to AI-Enhanced Smart Contract Auditor

Thank you for your interest in contributing to our AI-Enhanced Smart Contract Auditor! This document provides guidelines and information for contributors.

## 📜 Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

### Our Standards

- **Be respectful** of differing opinions and viewpoints
- **Be collaborative** and open to constructive feedback
- **Be inclusive** and welcoming to all contributors
- **Be professional** in all interactions

### Unacceptable Behavior

- Harassment, discrimination, or any form of offensive behavior
- Trolling, insulting, or derogatory comments
- Publishing others' private information without permission
- Any conduct inappropriate in a professional setting

## 🚀 How Can I Contribute?

### Types of Contributions

#### 🐛 Bug Reports

- Report bugs using the GitHub issue tracker
- Include detailed steps to reproduce the issue
- Provide system information and error logs
- Check existing issues before creating new ones

#### 💡 Feature Requests

- Suggest new features through GitHub issues
- Explain the use case and expected behavior
- Consider the impact on existing functionality
- Provide mockups or examples if possible

#### 📝 Documentation

- Improve existing documentation
- Add missing documentation for features
- Fix typos and grammatical errors
- Update outdated information

#### 🔧 Code Contributions

- Fix bugs and implement features
- Improve code quality and performance
- Add tests for new functionality
- Refactor existing code

### Areas That Need Help

- **Frontend Components**: React components and UI improvements
- **Backend API**: Flask endpoints and business logic
- **AI Integration**: GPT-4 analysis improvements
- **Security Analysis**: Slither integration enhancements
- **Testing**: Unit and integration tests
- **Documentation**: README, API docs, and guides

## 🛠️ Development Setup

### Prerequisites

- **Node.js** 18+ and **npm**
- **Python** 3.8+ and **pip**
- **Git** for version control
- **OpenAI API key** for AI features

### Local Development

1. **Fork and Clone**

   ```bash
   git clone https://github.com/yourusername/ai-smart-contract-auditor.git
   cd ai-smart-contract-auditor
   ```

2. **Install Dependencies**

   ```bash
   # Frontend dependencies
   npm install

   # Backend dependencies
   cd backend
   python -m venv venv
   source venv/bin/activate  # Windows: venv\Scripts\activate
   pip install -r requirements.txt
   pip install slither-analyzer
   ```

3. **Environment Setup**

   ```bash
   # Frontend
   cp .env.example .env.local
   # Edit .env.local with your configuration

   # Backend
   cd backend
   cp env.example .env
   # Add your OpenAI API key to .env
   ```

4. **Start Development Servers**

   ```bash
   # Frontend (in project root)
   npm run dev

   # Backend (in backend directory)
   python app.py
   ```

### Development Tools

- **VS Code** with recommended extensions
- **ESLint** for JavaScript/TypeScript linting
- **Prettier** for code formatting
- **Python Black** for Python formatting
- **Git hooks** for pre-commit checks

## 📏 Coding Standards

### General Principles

- **Readability**: Write code that's easy to understand
- **Maintainability**: Structure code for long-term maintenance
- **Performance**: Consider performance implications
- **Security**: Follow security best practices
- **Testing**: Write tests for new functionality

### Frontend Standards (TypeScript/React)

### Documentation Standards

#### Code Comments

```typescript
/**
 * Analyzes a smart contract for security vulnerabilities
 * @param contractCode - The Solidity contract code to analyze
 * @param options - Analysis configuration options
 * @returns Promise resolving to analysis results
 */
async function analyzeContract(
  contractCode: string,
  options: AnalysisOptions = {},
): Promise<AnalysisResult> {
  // Implementation
}
```

#### README Updates

- Update README.md for new features
- Include usage examples
- Document configuration changes
- Add screenshots for UI changes

## 🧪 Testing Guidelines

### Frontend Testing

#### Frontend Unit Tests

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import AuditButton from './AuditButton';

describe('AuditButton', () => {
  it('should call onAudit when clicked', () => {
    const mockOnAudit = jest.fn();
    render(<AuditButton onAudit={mockOnAudit} />);

    fireEvent.click(screen.getByText('Audit Contract'));
    expect(mockOnAudit).toHaveBeenCalled();
  });
});
```

#### Integration Tests

```typescript
describe("Contract Analysis Flow", () => {
  it("should analyze contract and display results", async () => {
    // Test complete user flow
  });
});
```

### Backend Testing

#### Unit Tests

```python
import pytest
from app import SmartContractAuditor

class TestSmartContractAuditor:
    def test_analyze_syntax_valid_contract(self):
        auditor = SmartContractAuditor()
        code = "pragma solidity ^0.8.0; contract Test {}"
        result = auditor.analyze_syntax(code)
        assert result['valid'] is True

    def test_analyze_syntax_invalid_contract(self):
        auditor = SmartContractAuditor()
        code = "invalid code"
        result = auditor.analyze_syntax(code)
        assert result['valid'] is False
```

#### API Tests

```python
def test_audit_endpoint(client):
    response = client.post('/api/audit', json={
        'code': 'pragma solidity ^0.8.0; contract Test {}'
    })
    assert response.status_code == 200
    assert 'results' in response.json
```

### Test Coverage

- **Frontend**: Aim for 80%+ coverage
- **Backend**: Aim for 90%+ coverage
- **Critical paths**: 100% coverage required
- **New features**: Must include tests

## 🔄 Pull Request Process

### Before Submitting

1. **Check Existing Issues**: Ensure your PR addresses an existing issue
2. **Update Documentation**: Update README and other docs as needed
3. **Add Tests**: Include tests for new functionality
4. **Run Tests**: Ensure all tests pass locally
5. **Code Review**: Self-review your changes

### PR Guidelines

### Review Process

1. **Automated Checks**: CI/CD pipeline runs tests
2. **Code Review**: Maintainers review the PR
3. **Address Feedback**: Make requested changes
4. **Approval**: PR approved by maintainers
5. **Merge**: PR merged to main branch

## 🐛 Issue Reporting

### Bug Report Template

```markdown
## Bug Description

Clear description of the bug

## Steps to Reproduce

1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

## Expected Behavior

What should happen

## Actual Behavior

What actually happens

## Environment

- OS: [e.g. Windows 10]
- Browser: [e.g. Chrome 91]
- Version: [e.g. 1.0.0]

## Additional Information

Screenshots, logs, or other relevant information
```

### Feature Request Template

```markdown
## Feature Description

Clear description of the requested feature

## Use Case

How this feature would be used

## Proposed Implementation

Optional: suggest how to implement

## Alternatives Considered

Other approaches that were considered

## Additional Information

Mockups, examples, or other relevant information
```

## 🚀 Release Process

### Versioning

We follow [Semantic Versioning](https://semver.org/):

- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

### Release Checklist

- [ ] All tests passing
- [ ] Documentation updated
- [ ] Changelog updated
- [ ] Version bumped
- [ ] Release notes prepared
- [ ] Deployment tested

### Release Steps

1. **Create Release Branch**

   ```bash
   git checkout -b release/v1.2.0
   ```

2. **Update Version**

   ```bash
   # Update package.json and other version files
   npm version patch
   ```

3. **Update Changelog**

   ```bash
   # Add changes to CHANGELOG.md
   ```

4. **Create Release**

   ```bash
   git tag v1.2.0
   git push origin v1.2.0
   ```

## 📞 Getting Help

### Communication Channels

- **GitHub Issues**: For bugs and feature requests
- **GitHub Discussions**: For questions and general discussion
- **Discord**: For real-time chat and community
- **Email**: For private or sensitive matters

### Resources

- **Documentation**: README.md and inline comments
- **Code Examples**: Check existing code for patterns
- **Community**: Ask questions in discussions
- **Maintainers**: Contact directly for urgent issues

## 🙏 Recognition

Contributors will be recognized in:

- **README.md**: List of contributors
- **Release Notes**: Credit for significant contributions
- **GitHub Profile**: Public contribution history
- **Project Website**: Featured contributors section

---

**Thank you for contributing to the AI-Enhanced Smart Contract Auditor!** 🚀

Your contributions help make Web3 more secure for everyone.
