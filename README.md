# Subgraph-Subgraph-with-Subgraph-Studio
Learn how to create, test, and publish a subgraph to The Graph's decentralized network using Subgraph Studio, Graph CLI, and Graph TypeScript library. 

Zora is a NFT marketplace.

Zora contract address :
0xabEFBc9fD2F806065b4f3C237d4b59D9A97Bcac7


Steps:

1. Install graph CLI
	(You can install Graph CLI with either npm or yarn.)

```js
npm install -g @graphprotocol/graph-cli
```
```js
yarn global add @graphprotocol/graph-cli
```
2. Initialize your subgraph.

```js
graph init --studio zora-subgraph-test
```

3. The first file that we will update is
the graphql schema located at schema.graphql here we can delete the existing code and create a new entity for a token type the token will have fields for id token, id content, uri metadata uri, created at timestamp creatorand owner of the creator. We'll create next the user type will have fields for id tokens owned and tokens created, one-to-many relationships can be created using the derived.

4. Open subgraph.yaml subgraph.yaml describes the main configuration for your subgraph in addition to some of the boilerplate code that we will see in this subgraph.yaml file the cli was also able to pull down the abis for this smart contract. Events flag boilerplate event handlers have also been created, so, the first update that we'll make setting the start block which is an optional setting, that allows us to define from which block in the chain the data source will start indexing if the start block is not defined the subgraph will index events starting from the genesis block. Next we update the entities to be token and user to match the entities defined in our graphql schema and finally the only two event handlers we will use are tokenUriUpdated and transfer so we can remove all others to make it easier to work with smart contract events and entities. 

5. (Inside the folder zora-subgraph-test and after authentication)
To do this, let's go back to our terminal and run the codegen command when the codegen has completed you should see a file called schema.ts

```js
graph codegen && graph build
```

6. Open src mapping.ts next we'll import references to the tokenUriUpdated and transfer events as well as a reference to the token contract from the code that was generated for us by the cli. 
These imports will give us type safety as well as functions that will allow us to interact directly with the smart contract. Next we'll import the token and the user from the schema, these imports will allow us to interact with the graph node the interactions that we'll be using are facilitated by the graph typescript library. The graph typescript library gives us the following, an api for working with smart contracts events, blocks transactions and smart contract values, a store api to load and save entities from and to the graph node, store a log api to log and debug messages to the graph node output in the graph explorer and ipfs api to load files from ipfs a json api to parse json data and finally a crypto api to use cryptographic functions and low level primitives to translate between different type systems such as ethereum json graphql and assembly script.

6. Once all the above is done, the only thing left to do is to deploy the subgraph and publish it.
```js
graph deploy --studio zora-subgraph-test
```
7. Publish it in Subgraph studio web.