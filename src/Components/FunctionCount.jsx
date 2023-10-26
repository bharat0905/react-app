import React, { useState, useEffect } from "react";

function FunctionCount(){
    const compUnMount = () => {
        console.log("yo");
      };
    // const [rcount, setrcount] = useState();
    useEffect(()=>{
        console.log("yeh dekho");
        return()=>{
            compUnMount();
        }
        // var setrcount = document.getElementById('table');
        // console.log(setrcount);
    })

}

export default FunctionCount;