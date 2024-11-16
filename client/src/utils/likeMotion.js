const animVar = {
    visible : {
        scale : [1,1.2,1.4,1.5,1.7,1.5,1.4,1.2,1]
    }
}

const animationType = {
    duration :0.175,
    ease:"easeInOut",
    repeatType:"loop",
    repeat:2,
    onanimationend:{
        rotate:"0deg"
    }
}

export default {
    animVar,animationType
}; 