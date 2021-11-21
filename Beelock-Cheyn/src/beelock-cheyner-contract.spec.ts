/*
 * SPDX-License-Identifier: Apache-2.0
 */

import { Context } from 'fabric-contract-api';
import { ChaincodeStub, ClientIdentity } from 'fabric-shim';
import { BeelockCheynerContract } from '.';

import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import winston = require('winston');

chai.should();
chai.use(chaiAsPromised);
chai.use(sinonChai);

class TestContext implements Context {
    public stub: sinon.SinonStubbedInstance<ChaincodeStub> = sinon.createStubInstance(ChaincodeStub);
    public clientIdentity: sinon.SinonStubbedInstance<ClientIdentity> = sinon.createStubInstance(ClientIdentity);
    public logger = {
        getLogger: sinon.stub().returns(sinon.createStubInstance(winston.createLogger().constructor)),
        setLevel: sinon.stub(),
     };
}

describe('BeelockCheynerContract', () => {

    let contract: BeelockCheynerContract;
    let ctx: TestContext;

    beforeEach(() => {
        contract = new BeelockCheynerContract();
        ctx = new TestContext();
        ctx.stub.getState.withArgs('1001').resolves(Buffer.from('{"value":"beelock cheyner 1001 value"}'));
        ctx.stub.getState.withArgs('1002').resolves(Buffer.from('{"value":"beelock cheyner 1002 value"}'));
    });

    describe('#beelockCheynerExists', () => {

        it('should return true for a beelock cheyner', async () => {
            await contract.beelockCheynerExists(ctx, '1001').should.eventually.be.true;
        });

        it('should return false for a beelock cheyner that does not exist', async () => {
            await contract.beelockCheynerExists(ctx, '1003').should.eventually.be.false;
        });

    });

    describe('#createBeelockCheyner', () => {

        it('should create a beelock cheyner', async () => {
            await contract.createBeelockCheyner(ctx, '1003', 'beelock cheyner 1003 value');
            ctx.stub.putState.should.have.been.calledOnceWithExactly('1003', Buffer.from('{"value":"beelock cheyner 1003 value"}'));
        });

        it('should throw an error for a beelock cheyner that already exists', async () => {
            await contract.createBeelockCheyner(ctx, '1001', 'myvalue').should.be.rejectedWith(/The beelock cheyner 1001 already exists/);
        });

    });

    describe('#readBeelockCheyner', () => {

        it('should return a beelock cheyner', async () => {
            await contract.readBeelockCheyner(ctx, '1001').should.eventually.deep.equal({ value: 'beelock cheyner 1001 value' });
        });

        it('should throw an error for a beelock cheyner that does not exist', async () => {
            await contract.readBeelockCheyner(ctx, '1003').should.be.rejectedWith(/The beelock cheyner 1003 does not exist/);
        });

    });

    describe('#updateBeelockCheyner', () => {

        it('should update a beelock cheyner', async () => {
            await contract.updateBeelockCheyner(ctx, '1001', 'beelock cheyner 1001 new value');
            ctx.stub.putState.should.have.been.calledOnceWithExactly('1001', Buffer.from('{"value":"beelock cheyner 1001 new value"}'));
        });

        it('should throw an error for a beelock cheyner that does not exist', async () => {
            await contract.updateBeelockCheyner(ctx, '1003', 'beelock cheyner 1003 new value').should.be.rejectedWith(/The beelock cheyner 1003 does not exist/);
        });

    });

    describe('#deleteBeelockCheyner', () => {

        it('should delete a beelock cheyner', async () => {
            await contract.deleteBeelockCheyner(ctx, '1001');
            ctx.stub.deleteState.should.have.been.calledOnceWithExactly('1001');
        });

        it('should throw an error for a beelock cheyner that does not exist', async () => {
            await contract.deleteBeelockCheyner(ctx, '1003').should.be.rejectedWith(/The beelock cheyner 1003 does not exist/);
        });

    });

});
