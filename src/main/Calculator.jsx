import React, { Component } from 'react'
import './Calculator.css'

import Button from '../components/Button'
import Display from '../components/Display'

const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [ 0, 0 ],
    current: 0,
}

export default class Calculator extends Component{

    state = { ...initialState } // 'clona' a constante initialState e joga no state

    constructor(props){
        super(props)

        this.clearMemory = this.clearMemory.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.addDigit = this.addDigit.bind(this)
    }

    clearMemory(){
        this.setState({ ...initialState })
    }

    setOperation(operation){
        if(this.state.current === 0){
            // altera os valores do estado state quando for o segundo valor da opreação
            this.setState({ operation, clearDisplay: true, current: 1 })
        }else{
            const equals = operation === '='
            const currentOperation = this.state.operation

            const values = { ...this.state.values }

            try{
                // calculo realizado pelo app
                values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`)
                
            } catch(erro){
                values[0] = this.state.values
            }

            values[1] = 0

            // exibir resultado do calculo
            this.setState({ 
                displayValue: values[0], 
                operation: equals ? null : operation, 
                current: equals ? 0 : 1,
                clearDisplay: !equals,
                values
            })
        }
    }

    addDigit(n){
        // regra que evita utilização de dois pontos em um número real
        if ( n === '.' && this.state.displayValue.includes('.') ){
            return 
        }

        const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay
        const currentValue = clearDisplay ? '' : this.state.displayValue
        const displayValue = currentValue + n 
        this.setState({ displayValue, clearDisplay: false })

        if(n !== '.'){
            const i = this.state.current // recebe o indice do valor a ser alterado
            const newValue = parseFloat(displayValue) // converter para float o valor exibido no display
            const values = [ ...this.state.values ] // clonado o conteúdo do state para a constante values
            values[i] = newValue // alteração do valor atual do values (pode ser índice 0 ou 1)
            this.setState({ values }) // retornou para o state os valores alterados
        }

    }

    render(){
        return(
            <div className="calculator">
                <Display value={this.state.displayValue} />
                <Button label="AC" click={this.clearMemory} triple />
                <Button label="/" click={this.setOperation} operation />
                <Button label="7" click={this.addDigit} />
                <Button label="8" click={this.addDigit} />
                <Button label="9" click={this.addDigit} />
                <Button label="*" click={this.setOperation} operation />
                <Button label="4" click={this.addDigit} />
                <Button label="5" click={this.addDigit} />
                <Button label="6" click={this.addDigit} />
                <Button label="-" click={this.setOperation} operation />
                <Button label="1" click={this.addDigit} />
                <Button label="2" click={this.addDigit} />
                <Button label="3" click={this.addDigit} />
                <Button label="+" click={this.setOperation} operation />
                <Button label="0" click={this.addDigit} double />
                <Button label="." click={this.addDigit} />
                <Button label="=" click={this.setOperation} operation />
            </div>
        )
    }
}