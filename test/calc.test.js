import Calculator from '../src/components/Calculator'
import { mount } from '@vue/test-utils'
import { expect } from '@jest/globals'
import "core-js/stable";
import "regenerator-runtime/runtime";

describe('Calculator input tests', () => {
  it('Test operand1 input value', () => {
    const Wrapper = mount(Calculator)
  
    const operand1Input = Wrapper.find('input[name=operand1]')
    operand1Input.setValue('1')
  
    expect(Wrapper.vm.operand1).toBe(1)
  })
  
  it('Test operand2 input value', () => {
    const Wrapper = mount(Calculator)
  
    const operand2Input = Wrapper.find('input[name=operand2]')
    operand2Input.setValue('1')
  
    expect(Wrapper.vm.operand2).toBe(1)
  })

  it('Test division by zero value', async () => {
    const Wrapper = mount(Calculator)

    const operand1 = Wrapper.find('input[name=operand1]')
    operand1.setValue('10')
    const operand2 = Wrapper.find('input[name=operand2]')
    operand2.setValue('0')

    const divisionBtn = Wrapper.find('button[name="/"]')
    await divisionBtn.trigger('click')

    const err = Wrapper.find('div.error')
    expect(err.text()).toEqual(
      'Division by zero!'
    )
  })
})

describe('Calculator logic test', () => {
  test('Test sum operation', () => {
    const Wrapper = mount(Calculator)

    const operand1 = Wrapper.find('input[name=operand1]')
    operand1.setValue('100')
    const operand2 = Wrapper.find('input[name=operand2]')
    operand2.setValue('5')

    const sumBtn = Wrapper.find('button[name="+"]')
    sumBtn.trigger('click')

    expect(Wrapper.vm.result).toBe(105)
  })

  test('Test sub operation', () => {
    const Wrapper = mount(Calculator)

    const operand1 = Wrapper.find('input[name=operand1]')
    operand1.setValue('100')
    const operand2 = Wrapper.find('input[name=operand2]')
    operand2.setValue('5')

    const subBtn = Wrapper.find('button[name="-"]')
    subBtn.trigger('click')

    expect(Wrapper.vm.result).toBe(95)
  })

  test('Test division operation', () => {
    const Wrapper = mount(Calculator)

    const operand1 = Wrapper.find('input[name=operand1]')
    operand1.setValue('100')
    const operand2 = Wrapper.find('input[name=operand2]')
    operand2.setValue('5')

    const divisionBtn = Wrapper.find('button[name="/"]')
    divisionBtn.trigger('click')

    expect(Wrapper.vm.result).toBe(20)
  })

  test('Test mult operation', () => {
    const Wrapper = mount(Calculator)

    const operand1 = Wrapper.find('input[name=operand1]')
    operand1.setValue('100')
    const operand2 = Wrapper.find('input[name=operand2]')
    operand2.setValue('5')

    const multBtn = Wrapper.find('button[name="*"]')
    multBtn.trigger('click')

    expect(Wrapper.vm.result).toBe(500)
  })

  test('Test pow operation', () => {
    const Wrapper = mount(Calculator)

    const operand1 = Wrapper.find('input[name=operand1]')
    operand1.setValue('2')
    const operand2 = Wrapper.find('input[name=operand2]')
    operand2.setValue('3')

    const powBtn = Wrapper.find('button[name="pow"]')
    powBtn.trigger('click')

    expect(Wrapper.vm.result).toBe(8)
  })

  test('Test div operation', () => {
    const Wrapper = mount(Calculator)

    const operand1 = Wrapper.find('input[name=operand1]')
    operand1.setValue('9')
    const operand2 = Wrapper.find('input[name=operand2]')
    operand2.setValue('2')

    const divBtn = Wrapper.find('button[name="div"]')
    divBtn.trigger('click')

    expect(Wrapper.vm.result).toBe(4)
  })
})

describe('Calculator screen keyboard test', () => {
  it('Test setnum operation', async () => {
    const Wrapper = mount(Calculator)
    const checkbox = Wrapper.find('#checkbox')
    await checkbox.setChecked()

    expect(Wrapper.vm.checked).toBe(true)
    const setnumBtn = Wrapper.find('button[data-number="5"]')
    await setnumBtn.trigger('click')
    expect(Wrapper.vm.operand1).toBe(5)
  })

  it('Test setnum2 operation', async () => {
    const Wrapper = mount(Calculator)
    const checkbox = Wrapper.find('#checkbox')
    await checkbox.setChecked()

    expect(Wrapper.vm.checked).toBe(true)
    const radio = Wrapper.find('#two')
    await radio.setChecked()
    const setnumBtn = Wrapper.find('button[data-number="5"]')
    await setnumBtn.trigger('click')
    expect(Wrapper.vm.operand2).toBe(5)
  })

  it('Test delnum operation', async () => {
    const Wrapper = mount(Calculator)
    const operand1Input = Wrapper.find('input[name=operand1]')
    operand1Input.setValue('123')
    const checkbox = Wrapper.find('#checkbox')
    await checkbox.setChecked()

    expect(Wrapper.vm.checked).toBe(true)      
    const delnumBtn = Wrapper.find('button[name="delnumber"]')
    await delnumBtn.trigger('click')
    expect(Wrapper.vm.operand1).toBe(12)
  })

  it('Test delnum2 operation', async () => {
    const Wrapper = mount(Calculator)
    const operand2Input = Wrapper.find('input[name=operand2]')
    operand2Input.setValue('123')
    const checkbox = Wrapper.find('#checkbox')
    await checkbox.setChecked()

    expect(Wrapper.vm.checked).toBe(true)
    const radio = Wrapper.find('#two')
    await radio.setChecked()
    const delnumBtn = Wrapper.find('button[name="delnumber"]')
    await delnumBtn.trigger('click')
    expect(Wrapper.vm.operand2).toBe(12)
  })
})
