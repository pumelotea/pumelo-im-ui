const String = {
    isEmpty(val){
        return val === undefined ? true : val === null ? true : val === '';
    }
}

export {String}