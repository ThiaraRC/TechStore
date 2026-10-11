export default function Label({ htmlFor, texto }) {
  return <label htmlFor={htmlFor}>{texto}</label>
}