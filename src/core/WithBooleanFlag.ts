import { makeAutoObservable } from 'mobx'

export default class WithBooleanFlag {
  value: boolean

  constructor(initialFlag = false) {
    makeAutoObservable(this)
    this.value = initialFlag
  }

  setTrue = () => {
    this.value = true
  }

  setFalse = () => {
    this.value = false
  }

  toggle = () => {
    this.value = !this.value
  }
}
