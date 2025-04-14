/**
 * Get the CSRF token from the meta tag.
 * @returns The CSRF token.
 */
declare function useCsrfToken(): string;

declare const useConfetti: () => {
    fireConfetti: () => void;
};

export { useConfetti, useCsrfToken };
