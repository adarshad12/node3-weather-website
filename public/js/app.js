const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#msg-1')
const msg2 = document.querySelector('#msg-2')
    // const msg3 = document.querySelector('#msg-3')



weatherform.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    msg1.textContent = 'Loading....'
    msg2.textContent = ''
        // console.log(location)
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                // console.log(data.error)
                msg1.textContent = data.error

            } else {
                msg1.textContent = data.location
                msg2.textContent = data.temperature.temperature
                    // console.log(data.location)
            }
        })
    })
})