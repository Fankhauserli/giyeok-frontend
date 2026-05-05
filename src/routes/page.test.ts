import { render, screen } from '@testing-library/svelte';
import Page from './+page.svelte';
import { expect, test } from 'vitest';

test('renders landing page with title', () => {
    render(Page, { data: { user: { loggedIn: false } } });
    const title = screen.getByText(/Master TOPIK with/i);
    expect(title).toBeInTheDocument();
});

test('shows Get Started button when not logged in', () => {
    render(Page, { data: { user: { loggedIn: false } } });
    const button = screen.getByText(/Get Started Free/i);
    expect(button).toBeInTheDocument();
});

test('shows Dashboard link when logged in', () => {
    render(Page, { data: { user: { loggedIn: true } } });
    const link = screen.getByText(/Go to Dashboard/i);
    expect(link).toBeInTheDocument();
});
