var express = require('express')
var f = require('fs')
var app = express()


var customers = []
let Listc = f.readFileSync("customer.txt","utf-8")
Listc = Listc.split(';')

for(i=0;i<Listc.length;i+=2){
    var customer ={
        name: Listc[i].trim(),
        event: Listc[i+1]
    }
    customers.push(customer)

}
console.log(customers[0].event)

app.set('view engine','hbs')

app.get('/',(req,res)=>{
        res.render('home',{'List':Listc,'name':customers.name,'event':customers.event,'customers':customers})
})
app.get('/sevent',(req,res)=>{
    res.render('sEvent')
})

app.use(express.urlencoded({extended:true}))
app.post('/list',(req,res)=>{
    let name = req.body.name
    let event = req.body.event
    customer={
        name: name,
        event: event
    }
    customers.push(customer)
    f.appendFileSync('customer.txt','\n'+ name+';'+event)
    
    res.render('home',{'event':customers.event,'customers':customers})
})




const PORT = process.env.PORT ||8000
app.listen(PORT,()=>{
    console.log('ok',PORT)
})
