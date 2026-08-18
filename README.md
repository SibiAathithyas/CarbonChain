# CarbonChain: Web3 Based Carbon Emission Monitoring System

## Overview

CarbonChain is an IoT and blockchain based environmental monitoring system designed to provide real time monitoring of emission related parameters while maintaining trustworthy and traceable records.

Traditional environmental monitoring systems commonly depend on centralized databases and reporting mechanisms. This can make it difficult to verify whether previously recorded data has been modified or manipulated. CarbonChain addresses this challenge by combining IoT based sensing with blockchain technology.

The system collects environmental readings through sensors connected to a microcontroller. The readings are transmitted to a backend server where they are processed and classified according to predefined thresholds. Processed records are stored in MongoDB for efficient application access while important verification records are registered on a blockchain through a Solidity smart contract.

A web based dashboard provides users with real time monitoring information and blockchain transaction details.

## Key Features

* Real time environmental parameter monitoring
* IoT based sensor data acquisition
* Arduino based hardware integration
* Backend data processing and validation
* MongoDB based data storage
* Blockchain based record verification
* Solidity smart contract integration
* Transaction hash generation
* Emission status classification
* Real time web dashboard
* Historical monitoring data
* Transparent verification of blockchain records
* Hybrid off chain and on chain data architecture

## System Architecture

```text
                    ┌─────────────────────┐
                    │    IoT Sensors      │
                    │                     │
                    │ Gas Sensor          │
                    │ Particulate Sensor  │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   Microcontroller   │
                    │      Arduino         │
                    └──────────┬──────────┘
                               │
                         Serial Data
                               │
                               ▼
                    ┌─────────────────────┐
                    │    Node.js Backend  │
                    │                     │
                    │ Data Processing     │
                    │ Validation          │
                    │ Classification      │
                    └───────┬─────┬───────┘
                            │     │
                 Off Chain  │     │  On Chain
                            │     │
                            ▼     ▼
                    ┌──────────┐  ┌────────────────┐
                    │ MongoDB  │  │ Smart Contract │
                    │ Database │  │   Blockchain   │
                    └────┬─────┘  └───────┬────────┘
                         │                │
                         └───────┬────────┘
                                 ▼
                       ┌────────────────────┐
                       │   Web Dashboard    │
                       │                    │
                       │ Live Monitoring    │
                       │ Status             │
                       │ Historical Data    │
                       │ Blockchain Logs    │
                       └────────────────────┘
```

## How the System Works

### 1. Environmental Data Collection

Sensors connected to the microcontroller continuously collect environmental measurements.

The hardware layer can include gas sensing modules and particulate matter sensing modules depending on the parameters being monitored.

The microcontroller reads the sensor output and prepares the readings for transmission to the backend.

### 2. Serial Communication

The microcontroller communicates with the backend system through a serial connection.

The Node.js backend uses the SerialPort library to receive the sensor readings from the connected Arduino device.

The received values are parsed and converted into structured application data.

### 3. Data Processing

The backend processes incoming sensor readings before they are stored.

The processing stage includes:

* Reading validation
* Data formatting
* Threshold comparison
* Emission status classification
* Timestamp generation
* Sensor identification

The system categorizes readings according to configured thresholds such as:

```text
Normal
Warning
Critical
```

These thresholds can be configured according to the requirements of the monitored environment.

### 4. MongoDB Storage

MongoDB is used as the off chain database.

It stores detailed sensor records that are required for application operations and dashboard visualization.

A typical record can contain:

```text
Sensor ID
Emission Value
Parameter Type
Status
Timestamp
Blockchain Transaction Hash
```

Using MongoDB for detailed application data avoids putting large amounts of telemetry directly on the blockchain.

### 5. Blockchain Verification

Validated records are connected to a blockchain smart contract.

The blockchain layer is primarily used for verification and integrity rather than storing the complete sensor dataset.

A blockchain transaction provides a unique transaction hash that can be used to verify that a particular record was registered on the blockchain.

This provides:

* Data integrity
* Traceability
* Tamper resistance
* Timestamped records
* Transparent verification

### 6. Smart Contract

The blockchain component uses a Solidity smart contract to register verified emission information.

The contract can record information such as:

```text
Sensor ID
Emission Value
Timestamp
Record Identifier
```

The smart contract provides a programmable interface between the backend application and the blockchain network.

### 7. Dashboard

The frontend provides a centralized interface for monitoring the system.

The dashboard can display:

* Current sensor readings
* Emission levels
* Environmental status
* Historical readings
* Sensor information
* Blockchain transaction hashes
* Verification information

This allows users to monitor environmental conditions without directly interacting with the backend or blockchain infrastructure.

## Technology Stack

### Hardware

* Arduino
* Gas sensing module
* Particulate matter or dust sensor
* USB or serial communication

### Frontend

* React
* JavaScript
* HTML
* CSS
* Web based dashboard components

### Backend

* Node.js
* Express.js
* SerialPort
* REST API

### Database

* MongoDB

### Blockchain

* Ethereum compatible blockchain
* Ganache for local blockchain development
* Solidity
* Ethers.js or Web3 based integration

### Development Tools

* Arduino IDE
* Node.js
* npm
* MongoDB
* Ganache
* Git
* GitHub

## Data Flow

The complete data flow of CarbonChain is:

```text
Sensor
   ↓
Arduino
   ↓
Serial Communication
   ↓
Node.js Backend
   ↓
Data Validation
   ↓
Emission Classification
   ↓
MongoDB
   ↓
Smart Contract
   ↓
Blockchain Transaction
   ↓
Transaction Hash
   ↓
Web Dashboard
```

## Hybrid Storage Architecture

CarbonChain follows a hybrid storage approach.

### Off Chain Storage

MongoDB stores detailed sensor telemetry.

This provides:

* Faster data retrieval
* Efficient querying
* Historical data management
* Dashboard performance
* Scalable application storage

### On Chain Storage

The blockchain stores verification related information through the smart contract.

This provides:

* Immutability
* Traceability
* Transaction based verification
* Tamper resistant records

This separation reduces unnecessary blockchain storage while retaining the integrity benefits of distributed ledger technology.

## Data Integrity and Recording Algorithm

CarbonChain follows a simple data integrity and recording workflow.

```text
Receive Sensor Reading
        ↓
Validate Reading
        ↓
Check Threshold
        ↓
Classify Emission Level
        ↓
Store Detailed Data in MongoDB
        ↓
Register Verification Record
        ↓
Execute Smart Contract
        ↓
Generate Blockchain Transaction
        ↓
Store Transaction Hash
        ↓
Display Result on Dashboard
```

The transaction hash acts as a reference for verifying the blockchain registration of an emission record.

## Emission Classification

The system uses predefined threshold values to classify environmental readings.

```text
Reading within safe range
        ↓
      Normal

Reading approaching threshold
        ↓
      Warning

Reading exceeding critical threshold
        ↓
     Critical
```

The exact threshold values can be configured according to the sensor characteristics and the environmental parameters being monitored.

## Project Objectives

The primary objectives of CarbonChain are:

1. To monitor environmental parameters in real time using IoT sensors.

2. To process and classify sensor readings automatically.

3. To maintain detailed monitoring data using MongoDB.

4. To provide blockchain based verification for important emission records.

5. To improve transparency and traceability in environmental monitoring.

6. To provide a user friendly dashboard for monitoring and verification.

7. To demonstrate the practical integration of IoT and blockchain technologies.

## Advantages

### Transparency

Blockchain transactions provide a verifiable record of registered environmental data.

### Data Integrity

Once a blockchain transaction is confirmed it becomes difficult to alter without detection.

### Real Time Monitoring

IoT sensors allow environmental parameters to be monitored continuously.

### Efficient Data Management

MongoDB provides efficient storage and retrieval of detailed sensor information.

### Traceability

Blockchain transaction hashes provide a traceable reference for registered records.

### Scalable Architecture

The separation of IoT sensing backend processing database storage and blockchain verification allows individual components to be extended independently.

## Potential Applications

CarbonChain can serve as a prototype architecture for:

* Industrial environmental monitoring
* Pollution monitoring
* Smart manufacturing
* Environmental compliance systems
* Sustainability monitoring
* Carbon accounting systems
* Carbon credit verification
* Smart city environmental monitoring
* Environmental auditing

## Sustainable Development Goals

CarbonChain supports several United Nations Sustainable Development Goals.

### SDG 9: Industry Innovation and Infrastructure

The project combines IoT blockchain and web technologies to develop a technology driven environmental monitoring infrastructure.

### SDG 11: Sustainable Cities and Communities

The monitoring architecture can be extended to support environmental monitoring within urban and smart city environments.

### SDG 12: Responsible Consumption and Production

Reliable emission monitoring can support industries in tracking environmental impact and improving sustainable production practices.

### SDG 13: Climate Action

The primary sustainability objective of CarbonChain is to support monitoring and accountability of emission related environmental data.

## Project Scope

The current project focuses on developing and demonstrating a functional prototype that integrates:

```text
IoT Sensing
      +
Serial Communication
      +
Backend Processing
      +
MongoDB
      +
Blockchain Smart Contract
      +
Web Dashboard
```

The system is intended as a prototype and can be further enhanced for large scale industrial deployment through calibrated industrial sensors secure communication protocols distributed blockchain networks and regulatory compliance mechanisms.

## Future Enhancements

Future versions of CarbonChain can include:

* Industrial grade calibrated sensors
* ESP32 based wireless sensor communication
* MQTT based IoT communication
* Multiple monitoring locations
* Role based access control
* Automated environmental alerts
* Advanced anomaly detection
* Machine learning based emission prediction
* Automated carbon footprint calculation
* Carbon credit management
* Integration with renewable energy monitoring
* Multi organization blockchain networks
* Mobile application support
* Advanced analytics and reporting
* Integration with regulatory reporting systems

## Project Structure

```text
CarbonChain
│
├── backend
│   ├── server.js
│   ├── package.json
│   └── ...
│
├── frontend
│   ├── src
│   ├── public
│   ├── package.json
│   └── ...
│
├── smart-contracts
│   ├── contracts
│   │   └── CarbonChain.sol
│   ├── migrations
│   └── ...
│
├── hardware
│   ├── Arduino
│   └── sensor code
│
├── README.md
└── ...
```

The exact directory structure may vary depending on the current implementation.

## Installation and Setup

### Prerequisites

Install the following software before running the project:

* Node.js
* npm
* MongoDB
* Arduino IDE
* Ganache
* Git

### Clone the Repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd CarbonChain
```

### Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Start the backend:

```bash
node server.js
```

The backend will start on the port configured in `server.js`.

### Frontend Setup

Navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

If the project uses a different frontend configuration then use the start command specified in its `package.json`.

### MongoDB Setup

Start MongoDB and configure the database connection according to the environment configuration used by the backend.

The backend should have access to the configured MongoDB database before sensor data collection begins.

### Arduino Setup

1. Connect the required sensors to the Arduino.
2. Open the Arduino code using Arduino IDE.
3. Select the correct board.
4. Select the appropriate COM port.
5. Upload the program.
6. Close applications that may occupy the serial port.
7. Start the CarbonChain backend.
8. Verify that sensor readings are being received.

### Blockchain Setup

For local development:

1. Start Ganache.
2. Create or use a local Ethereum compatible network.
3. Deploy the CarbonChain smart contract.
4. Configure the deployed contract address in the backend.
5. Configure the blockchain RPC endpoint.
6. Start the backend.
7. Generate sensor records and verify their blockchain transactions.

## Environment Configuration

Sensitive configuration values should not be committed to GitHub.

Create an environment configuration file such as:

```text
.env
```

Example configuration:

```text
MONGODB_URI=your_mongodb_connection_string
BLOCKCHAIN_RPC_URL=your_blockchain_rpc_url
CONTRACT_ADDRESS=your_deployed_contract_address
PORT=your_backend_port
```

Never publish private keys passwords or other sensitive credentials in the repository.

## Testing

The system can be tested at each individual layer.

### IoT Testing

Verify that:

* Sensors produce readings
* Arduino receives sensor values
* Serial communication is functioning
* Correct COM port is selected

### Backend Testing

Verify that:

* Sensor data is received
* Invalid readings are handled
* Threshold classification works
* MongoDB records are created
* Blockchain transactions are triggered

### Blockchain Testing

Verify that:

* Smart contract is deployed
* Contract address is configured correctly
* Transactions are successfully submitted
* Transaction hashes are generated
* Records can be verified on the local blockchain

### Frontend Testing

Verify that:

* Dashboard loads correctly
* Current readings are displayed
* Historical records are retrieved
* Status indicators update
* Blockchain transaction information is displayed

## Security Considerations

CarbonChain is designed as an academic prototype and should not be considered a production ready industrial compliance system without further validation.

For production deployment the system would require:

* Sensor calibration
* Secure device authentication
* Encrypted communication
* Secure blockchain key management
* Access control
* Input sanitization
* Smart contract security auditing
* Fault tolerance
* Regulatory validation
* Industrial grade hardware

## Research Background

The project is based on the convergence of three major technology areas:

```text
Internet of Things
        +
Blockchain Technology
        +
Environmental Monitoring
```

IoT enables continuous environmental data acquisition while blockchain provides a mechanism for maintaining verifiable records. MongoDB complements the blockchain layer by providing efficient storage for detailed telemetry.

The combination creates a hybrid architecture that balances application performance with data integrity and traceability.

## Project Motivation

Environmental monitoring requires reliable information that can be trusted by different stakeholders.

A centralized system may provide efficient data management but introduces a central point where records can potentially be modified. CarbonChain explores how blockchain based verification can complement IoT monitoring and conventional databases.

The project therefore focuses on building a practical prototype rather than replacing existing industrial environmental monitoring infrastructure.

## Contributors

Developed as an academic project by the CarbonChain project team.

## License

This project is intended for academic and educational purposes.

If a specific open source license is required for redistribution then an appropriate license such as the MIT License can be added to the repository.

## Acknowledgement

This project was developed as an academic exploration of IoT based environmental monitoring blockchain technology and decentralized data verification.

## Keywords

CarbonChain
Carbon Emission Monitoring
IoT
Blockchain
Web3
Smart Contracts
Solidity
MongoDB
Arduino
Environmental Monitoring
Carbon Credits
Sustainability
Data Integrity
Emission Tracking
