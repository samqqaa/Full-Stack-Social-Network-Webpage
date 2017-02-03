import { expect } from 'chai'
import particle, { update } from './particle'

describe('Particle Functionality', () => {

    var width = 600
    var height = 800
    var canvas = {width, height}

    it('should have default values', () => {
        const p = particle({})
        expect(p).to.be.ok
        expect(p.missingAttribute).to.not.be.ok
        //check position
        expect(p.position).to.be.ok
        //check velocity
        expect(p.velocity).to.be.ok
        //check acceleration
        expect(p.acceleration).to.be.ok
        //check mass
        expect(p.mass).to.be.ok
        
    })

    it('should update the position by the velocity', () => {
        const p = particle({ position: [1, 1], velocity: [0.5, -0.5] })
        const { position } = update(p, 1.0, canvas)
        expect(position).to.eql([1.5, 0.5])
    })

    it('should update the position by the velocity and time delta', () => {
        const p = particle({ position: [1, 1], velocity: [0.5, -0.5] })
        const { position } = update(p, 2.0, canvas) // dt is different here
        expect(position).to.eql([2.0, 0.0])
    })

    it('should update the velocity by the acceleration', () => {
        const p = particle({ acceleration: [1, 1], velocity: [0.5, -0.5] })
        const { velocity } = update(p, 1.0, canvas) 
        expect(velocity).to.eql([1.5, 0.5])        
    })

    it('particles should wrap around the world', () => {
        const p = particle({ position: [1000, 900], velocity: [0.5, -0.5] })
        const { position } = update(p, 0, canvas) 
        //check 4 sides(left,right,lower,upper)
        expect(position[0]>=0).to.be.ok
        expect(position[0]<=width).to.be.ok
        expect(position[1]>=0).to.be.ok
        expect(position[0]<=height).to.be.ok

    })

})
