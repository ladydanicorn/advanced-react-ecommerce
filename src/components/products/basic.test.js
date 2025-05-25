import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Basic Testing Environment', () => {
  test('renders a simple component', () => {
    render(<div>Hello, world!</div>);
    expect(screen.getByText('Hello, world!')).toBeInTheDocument();
  });
  
  test('renders a component with props', () => {
    const TestComponent = ({ message }) => <div>{message}</div>;
    render(<TestComponent message="Test message" />);
    expect(screen.getByText('Test message')).toBeInTheDocument();
  });
  
  test('renders nested components', () => {
    const ChildComponent = () => <span>Child component</span>;
    const ParentComponent = () => (
      <div>
        <h1>Parent component</h1>
        <ChildComponent />
      </div>
    );
    
    render(<ParentComponent />);
    expect(screen.getByText('Parent component')).toBeInTheDocument();
    expect(screen.getByText('Child component')).toBeInTheDocument();
  });
});