interface btnData {
    name: string,
    func: string
}

const numbers = ():btnData[]=> {
    const nums:btnData[] = [];

    for(let i = 0; i < 10; i++){
        nums.push({
            name: `${i}`,
            func: `${i}`
        });
    }
    return nums;
}

const variables = ():btnData[]=> {
    const vars:string[] = ["A","B","C","D","E","F","X","Y","M", 'a','b','r','n','c'];
    const varList:btnData[] = [];

    vars.forEach(v => {
        varList.push({
            name: v,
            func: v
        })
    });

    return varList;
}

const data:btnData[] = [
    ...numbers(),
    ...variables(),
    {
        name: "·",
        func: "."
    },
    {
        name: "±",
        func: "±"
    },
    {
        name: "(",
        func: "("
    },
    {
        name: ")",
        func: ")"
    },
    {
        name: "×",
        func: " × "
    },
    {
        name: "÷",
        func: " ÷ "
    },
    {
        name: "+",
        func: " + "
    },
    {
        name: "−",
        func: " − "
    }, 
    {
        name: "=",
        func: "="
    },
    {
        name: "sin",
        func: "sin()"
    },
    {
        name: "tan",
        func: "tan()"
    },
    {
        name: "cos",
        func: "cos()"
    },
    {
        name: "√",
        func: "√()"
    },
    {
        name: "←",
        func: "←"
    },
    {
        name: "→",
        func: "→"
    },
    {
        name: "log",
        func: "log10()"
    },
    {
        name: "π",
        func: "π"
    },
    {
        name: "ln",
        func: "ln()"
    },
    {
        name: "DEL",
        func: "del"
    },
    {
        name: "x<sup>2</sup>",
        func: "^(2)"
    },
    {
        name: "cos⁻¹",
        func: "cos⁻¹()"
    },
    {
        name: "sin⁻¹",
        func: "sin⁻¹()"
    },
    {
        name: "tan⁻¹",
        func: "tan⁻¹()"
    },
    {
        name: "x^-1",
        func: "^(-1)"
    },
    {
        name: "cuberoot",
        func: "³√()"
    },
    {
        name: "10^x",
        func: "10^()"
    },
    {
        name: "e^x",
        func: "e^()"
    },
    {
        name: "ANS",
        func: "ANS"
    },
    {
        name: "STO",
        func: "STO"
    },
    {
        name: "2nd F",
        func: "2nd F"
    },  {
        name: "ALPHA",
        func: "alpha"
    },
    {
        name: "x<sup>3</sup>",
        func: "^(3)"
    },{
        name: "off",
        func: "off"
    },{
        name: "ON/C",
        func: "on"
    },{
        name: "RCL",
        func: "RCL"
    }

];

export default data;