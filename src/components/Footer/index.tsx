export function Footer() {
  return (
    <footer className="w-full h-11 border-t flex items-center justify-center">
      <span className="text-xs text-muted">
        Criado e desenvolvido por{' '}
        <a
          href="https://www.andreyaraujo.dev"
          target="_blank"
          className="hover:underline"
        >
          Andrey Araújo
        </a>{' '}
        - {new Date().getFullYear()}
      </span>
    </footer>
  )
}
