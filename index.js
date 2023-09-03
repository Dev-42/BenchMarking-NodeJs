const https = require('https')
const fs = require('fs').promises

const port = 8000
let server = https.createServer((req,res) => {
    if(req.method === 'GET' && req.url === '/textsync')
    {
        async function readFileSync(filepath){
            try{
                let data = await fs.readFile(filepath,'utf-8')
                res.end(JSON.stringify(data))
            }catch(err){
                console.log("Error caught")
            }
        }
    
        readFileSync('./db.json')
    }
    else if(req.method === "GET" && req.url === '/textasync'){
        function readFileAsync(filepath){
            return new Promise((resolve,reject) => {
                fs.readFile(filepath, 'utf-8')
                    .then(data => {
                        resolve(data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        }
        readFileAsync('./db.json')
            .then(data => {
                console.log("File content",data)
            })
            .catch(error => {
                console.error("Error reading file",error)
            })
    }
})

server.listen(port, () => {
    console.log("Server Started successfully")
})