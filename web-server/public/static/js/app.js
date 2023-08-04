console.log("Client side javascript loaded")
fetch('https://puzzle.mead.io/puzzle').then((response)=>{
    response.json().then((data)=>{
        console.log(data)
    })
})
const form = document.querySelector('form');
const messagea = document.querySelector('#a');
const messageb = document.querySelector('#b');

form.addEventListener('submit',(e)=>{
    e.preventDefault()
    const search = document.querySelector('input').value;
    fetch('http://localhost:3000/temperature?loc='+search).then((res)=>{
        res.json().then((data)=>{
            if(data.error){
                messagea.textContent=data.error
            }else{
                messagea.textContent="temp is "+data.temp
            }
        })
        console.log(search,"PPPPPPPPPPPPPPPPPPPPPP")
        console.log('http://localhost:3000/temperature?loc='+search)
        messagea.textContent=JSON.stringify(res)
    })
    console.log("testing")
})