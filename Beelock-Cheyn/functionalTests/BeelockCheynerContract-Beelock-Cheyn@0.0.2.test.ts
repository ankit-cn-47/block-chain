/*
* Use this file for functional testing of your smart contract.
* Fill out the arguments and return values for a function and
* use the CodeLens links above the transaction blocks to
* invoke/submit transactions.
* All transactions defined in your smart contract are used here
* to generate tests, including those functions that would
* normally only be used on instantiate and upgrade operations.
* This basic test file can also be used as the basis for building
* further functional tests to run as part of a continuous
* integration pipeline, or for debugging locally deployed smart
* contracts by invoking/submitting individual transactions.
*/
/*
* Generating this test file will also trigger an npm install
* in the smart contract project directory. This installs any
* package dependencies, including fabric-network, which are
* required for this test file to be run locally.
*/

import * as assert from 'assert';
import * as fabricNetwork from 'fabric-network';
import { SmartContractUtil } from './ts-smart-contract-util';

import * as os from 'os';
import * as path from 'path';

describe('BeelockCheynerContract-Beelock-Cheyn@0.0.2' , () => {

    const homedir: string = os.homedir();
    const walletPath: string = path.join(homedir, '.fabric-vscode', 'v2', 'environments', 'Beelock-Cheyn', 'wallets', 'Org1');
    const gateway: fabricNetwork.Gateway = new fabricNetwork.Gateway();
    let fabricWallet: fabricNetwork.Wallet;
    const identityName: string = 'Org1 Admin';
    let connectionProfile: any;

    before(async () => {
        connectionProfile = await SmartContractUtil.getConnectionProfile();
        fabricWallet = await fabricNetwork.Wallets.newFileSystemWallet(walletPath);
    });

    beforeEach(async () => {
        const discoveryAsLocalhost: boolean = SmartContractUtil.hasLocalhostURLs(connectionProfile);
        const discoveryEnabled: boolean = true;

        const options: fabricNetwork.GatewayOptions = {
            discovery: {
                asLocalhost: discoveryAsLocalhost,
                enabled: discoveryEnabled,
            },
            identity: identityName,
            wallet: fabricWallet,
        };

        await gateway.connect(connectionProfile, options);
    });

    afterEach(async () => {
        gateway.disconnect();
    });

    describe('beelockCheynerExists', () => {
        it('should evaluate beelockCheynerExists transaction', async () => {
            // TODO: populate transaction parameters
            const beelockCheynerId: string = '002';
            const args: string[] = [ beelockCheynerId];
            // TODO: populate or delete transientData as appropriate
            const transientData: fabricNetwork.TransientMap = {};
            const response: Buffer = await SmartContractUtil.evaluateTransaction('BeelockCheynerContract', 'beelockCheynerExists', args, gateway, transientData);
            // submitTransaction returns buffer of transcation return value
            // TODO: Update with return value of transaction
            assert.strictEqual(JSON.parse(response.toString()), true);
            // assert.strictEqual(JSON.parse(response.toString()), undefined);
        }).timeout(10000);
    });

    describe('createBeelockCheyner', () => {
        it('should submit createBeelockCheyner transaction', async () => {
            // TODO: populate transaction parameters
            const beelockCheynerId: string = 'EXAMPLE';
            const value: string = 'EXAMPLE';
            const args: string[] = [ beelockCheynerId, value];
            // TODO: populate or delete transientData as appropriate
            const transientData: fabricNetwork.TransientMap = {};
            const response: Buffer = await SmartContractUtil.submitTransaction('BeelockCheynerContract', 'createBeelockCheyner', args, gateway, transientData);
            // submitTransaction returns buffer of transcation return value
            // TODO: Update with return value of transaction
            assert.strictEqual(true, true);
            // assert.strictEqual(JSON.parse(response.toString()), undefined);
        }).timeout(10000);
    });

    describe('readBeelockCheyner', () => {
        it('should evaluate readBeelockCheyner transaction', async () => {
            // TODO: populate transaction parameters
            const beelockCheynerId: string = 'EXAMPLE';
            const args: string[] = [ beelockCheynerId];
            // TODO: populate or delete transientData as appropriate
            const transientData: fabricNetwork.TransientMap = {};
            const response: Buffer = await SmartContractUtil.evaluateTransaction('BeelockCheynerContract', 'readBeelockCheyner', args, gateway, transientData);
            // submitTransaction returns buffer of transcation return value
            // TODO: Update with return value of transaction
            assert.strictEqual(true, true);
            // assert.strictEqual(JSON.parse(response.toString()), undefined);
        }).timeout(10000);
    });

    describe('updateBeelockCheyner', () => {
        it('should submit updateBeelockCheyner transaction', async () => {
            // TODO: populate transaction parameters
            const beelockCheynerId: string = 'EXAMPLE';
            const newValue: string = 'EXAMPLE';
            const args: string[] = [ beelockCheynerId, newValue];
            // TODO: populate or delete transientData as appropriate
            const transientData: fabricNetwork.TransientMap = {};
            const response: Buffer = await SmartContractUtil.submitTransaction('BeelockCheynerContract', 'updateBeelockCheyner', args, gateway, transientData);
            // submitTransaction returns buffer of transcation return value
            // TODO: Update with return value of transaction
            assert.strictEqual(true, true);
            // assert.strictEqual(JSON.parse(response.toString()), undefined);
        }).timeout(10000);
    });

    describe('deleteBeelockCheyner', () => {
        it('should submit deleteBeelockCheyner transaction', async () => {
            // TODO: populate transaction parameters
            const beelockCheynerId: string = 'EXAMPLE';
            const args: string[] = [ beelockCheynerId];
            // TODO: populate or delete transientData as appropriate
            const transientData: fabricNetwork.TransientMap = {};
            const response: Buffer = await SmartContractUtil.submitTransaction('BeelockCheynerContract', 'deleteBeelockCheyner', args, gateway, transientData);
            // submitTransaction returns buffer of transcation return value
            // TODO: Update with return value of transaction
            assert.strictEqual(true, true);
            // assert.strictEqual(JSON.parse(response.toString()), undefined);
        }).timeout(10000);
    });

    describe('queryAllAssets', () => {
        it('should evaluate queryAllAssets transaction', async () => {
            // TODO: Update with parameters of transaction
            const args: string[] = [];
            // TODO: populate or delete transientData as appropriate
            const transientData: fabricNetwork.TransientMap = {};
            const response: Buffer = await SmartContractUtil.evaluateTransaction('BeelockCheynerContract', 'queryAllAssets', args, gateway, transientData);
            // submitTransaction returns buffer of transcation return value
            // TODO: Update with return value of transaction
            assert.strictEqual(true, true);
            // assert.strictEqual(JSON.parse(response.toString()), undefined);
        }).timeout(10000);
    });

});
