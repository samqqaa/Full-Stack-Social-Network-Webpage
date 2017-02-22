import React from 'react'
import TestUtils from 'react-addons-test-utils'
import { findDOMNode } from 'react-dom'
import { expect } from 'chai'

import { ToDoItem } from './todoItem'

const findByClassname = (children, classname) => {
    const result = Array.prototype.filter.call(children, it => it.className.indexOf(classname) >= 0)
    return result.length ? result[0] : null
}

describe('Validate ToDoItem', () => {

    it('should display a single ToDo with text', () => {
        const node = TestUtils.renderIntoDocument(
            <div>
                <ToDoItem text={"text"} done={false}  toggle={_ => _} remove={_ => _}/>
            </div>
        )
        const nodes = findDOMNode(node).children[0]
        expect(nodes.children.length).to.equal(3)
        expect(nodes.children[1].innerHTML).to.equal("text")
        // use TestUtils.renderIntoDocument
        // findDOMNode and assert 3 children of the ToDoItem element
        // assert the innerHTML of the todo is the text you initially set
    })

    it('should display a single ToDo with no classname', () => {
        const node = TestUtils.renderIntoDocument(
            <div>
                <ToDoItem text={"text"} done={false}  toggle={_ => _} remove={_ => _}/>
            </div>
        )
        const nodes = findDOMNode(node).children[0]
        expect(nodes.children.length).to.equal(3)
        expect(nodes.children[1].className).to.equal("")        
        // use TestUtils.renderIntoDocument
        // findDOMNode and assert 3 children of the ToDoItem element
        // assert there is no child with classname 'completed'
    })

    it('should toggle completed when clicked', () => {
        let toggled = false
        const node = TestUtils.renderIntoDocument(
            <div>
                <ToDoItem text={"text"} done={false} toggle={() => toggled = !toggled} remove={_ => _}/>
            </div>
        )
        const nodes = findDOMNode(node).children[0]
		TestUtils.Simulate.click(nodes.children[0])
        expect(toggled).to.equal(true)
        // use TestUtils.renderIntoDocument
        // when the checkbox is clicked via TestUtils.Simulate.click()
        // we expect the variable toggled to be true
    })

    it('should remove an item when clicked', () => {
        let removed = false
        const node = TestUtils.renderIntoDocument(
            <div>
                <ToDoItem text={"text"} done={false} toggle={_=>_} remove={() => removed = true}/>
            </div>
        )
        const nodes = findDOMNode(node).children[0]
		TestUtils.Simulate.click(nodes.children[2])
        expect(removed).to.equal(true)
        // use TestUtils.renderIntoDocument
        // when the remove button is clicked via TestUtils.Simulate.click()
        // we expect the variable removed to be true
    })

    it('should display a completed ToDo', () => {
        const node = TestUtils.renderIntoDocument(
            <div>
                <ToDoItem text={"text"} done={true} toggle={_=>_} remove={_=>_}/>
            </div>
        )
        const nodes = findDOMNode(node).children[0]
		TestUtils.Simulate.click(nodes.children[1])
        expect(nodes.children[1].className).to.equal("completed")
        // use TestUtils.renderIntoDocument
        // the item should have done=true
        // assert that the rendered className is "completed"
    })

})
