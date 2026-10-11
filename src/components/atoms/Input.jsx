export default function Input({ invalido, ...props }) {
  return <input className={invalido ? 'is-invalid' : undefined} {...props} />
}