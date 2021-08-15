const sendResponseBody = (data: Object, status:number) => {
    let success;
    if (status >= 200 && status <= 399) {
        success = true
    }else{
        success = false
    }

    return {
        success,
        data
    }
}


const teste = {
    name:"teste"
}
console.log(sendResponseBody(teste, 400))