export default function Header() {
    let date = new Date()
    let currentDate = date.toLocaleDateString('en-GB')

    return (
        <>
        <h1>CV<br/>Generator</h1>
        <div>
        <p>{currentDate}</p>
        
        </div>
        </>
  )
}