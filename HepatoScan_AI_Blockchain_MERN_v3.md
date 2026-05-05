# 🏥 HepatoScan AI — Full Project Blueprint v3.0
### AI-Powered Liver Intelligence + Blockchain Medical Network + MERN Stack
**Powered by Gemma 4 (31B / 26B MoE) + MedGemma 1.5 4B + Hyperledger Fabric / Ethereum**
**Target: Gemma 4 Good Hackathon — $200K Prize Pool | Deadline: May 18, 2026**

---

## 🆕 What's New in v3.0 — The Blockchain + MERN Revolution

| Feature | v2.0 (Old) | v3.0 (New) |
|---|---|---|
| Architecture | Python FastAPI + Next.js | **MERN Stack + FastAPI AI Layer** |
| Data Sharing | Siloed per hospital | **Blockchain — cross-hospital, real-time** |
| Patient Identity | Local DB only | **Decentralized DID (Patient NFT Identity)** |
| Report Access | Single hospital sees only their data | **Any authorized hospital reads instantly** |
| Emergency Action | Wait for radiologist + fax report | **Smart Contract auto-alerts + instant access** |
| Audit Trail | PostgreSQL logs | **Immutable blockchain audit trail** |
| Inter-hospital Consent | Manual forms, days of wait | **Patient signs once on-chain — valid everywhere** |
| Response Time | 24–72 hours | **< 60 seconds diagnosis + instant sharing** |

---

## 📋 Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [The Problem — Deep Market Research](#2-the-problem--deep-market-research)
3. [Blockchain Medical Network — The Core Innovation](#3-blockchain-medical-network--the-core-innovation)
4. [MERN Stack Architecture — Complete Redesign](#4-mern-stack-architecture--complete-redesign)
5. [Smart Contracts — Medical Automation Logic](#5-smart-contracts--medical-automation-logic)
6. [Cross-Hospital Emergency Alert System](#6-cross-hospital-emergency-alert-system)
7. [Decentralized Patient Identity (DID)](#7-decentralized-patient-identity-did)
8. [Full System Architecture — Blockchain + MERN + AI](#8-full-system-architecture--blockchain--mern--ai)
9. [Complete File Structure — MERN + Blockchain](#9-complete-file-structure--mern--blockchain)
10. [Complete Tech Stack v3.0](#10-complete-tech-stack-v30)
11. [AI/ML Pipeline (Unchanged — Still Best-in-Class)](#11-aiml-pipeline-unchanged--still-best-in-class)
12. [MERN Backend — Full Code](#12-mern-backend--full-code)
13. [Blockchain Layer — Full Code](#13-blockchain-layer--full-code)
14. [React Frontend — Advanced UI](#14-react-frontend--advanced-ui)
15. [Development Phases & Milestones](#15-development-phases--milestones)
16. [Hackathon Submission Strategy](#16-hackathon-submission-strategy)
17. [Client Pitch Talking Points v3.0](#17-client-pitch-talking-points-v30)

---

## 1. Executive Summary

**HepatoScan AI v3.0** is the world's first **Blockchain-Powered Medical Liver Intelligence Network** that:

- Accepts liver CT/X-ray/MRI/ultrasound DICOM images
- Runs a multi-stage AI pipeline: Segmentation → Classification → Staging → Explainability → Report
- Uses **MedGemma 1.5 4B** + **Gemma 4 31B** to generate structured clinical reports in <60 seconds
- **Stores every report, consent, and access event on-chain** — tamper-proof, auditable forever
- **ANY authorized hospital can instantly access a patient's complete liver history** — no faxing, no waiting, no phone calls
- **Smart contracts automatically alert emergency departments** when critical findings (LR-5, F4) are detected
- **Patient controls their own data** via decentralized identity — one signature unlocks records across all hospitals

**The Blockchain Advantage — Why It Changes Everything:**
> A patient collapses at Hospital B at 2 AM. They were scanned at Hospital A 6 months ago. Under the old system: Hospital B faxes Hospital A, waits 2–3 days, may never get the data. Under HepatoScan AI v3.0: Hospital B scans the patient's QR code, the blockchain returns the complete liver report, AI comparison, consent status — in 3 seconds. The ER doctor can act immediately.

---

## 2. The Problem — Deep Market Research

### 2.1 The Scale of Liver Disease (Unchanged — Still Critical)

- **2+ million deaths/year** from chronic liver disease (WHO, 2019)
- **NAFLD** affects **>25% of the global population** — ~2 billion people
- **HCC** is the **6th most common cancer** and **4th leading cause of cancer death** globally
- **Early-stage liver cancer 5-year survival: >70%** | **Late-stage: <15%** → Early detection is everything

### 2.2 The NEW Problem — Fragmented Hospital Data Silos

| Problem | Real-World Impact |
|---|---|
| Patient scanned at Hospital A, collapses at Hospital B | Hospital B starts from zero — dangerous |
| No inter-hospital report sharing | Duplicate scans costing ₹5,000–₹25,000 each |
| Emergency departments can't access prior imaging | Wrong treatment, delayed diagnosis |
| No unified patient liver history across hospitals | Missing disease progression context |
| Radiologist faxes/emails reports manually | Lost reports, HIPAA violations, 48–72 hour delays |
| No audit trail for who accessed patient data | Privacy violations impossible to detect |
| Multiple hospital visits, repeated consent forms | Patient frustration, incomplete forms |
| Referral letters lost in transit | Referring doctors never get feedback |

### 2.3 Why Blockchain Solves This — Not Just a Buzzword

Blockchain is NOT used here for cryptocurrency. It is used for:
1. **Immutable audit trail** — every access, every report stored permanently
2. **Decentralized consent** — patient signs once, valid at all hospitals
3. **Smart contract automation** — emergency alerts fire without human intervention
4. **Data integrity** — report hash on chain proves no tampering
5. **Interoperability** — standard for all hospitals without central server dependency

---

## 3. Blockchain Medical Network — The Core Innovation

### 3.1 Network Architecture — Hyperledger Fabric (Private Blockchain)

**Why Hyperledger Fabric and NOT Ethereum public chain:**
- **Permissioned network** — only approved hospitals can join
- **No gas fees** — hospitals don't pay per transaction
- **HIPAA compliant** — private, not public blockchain
- **High throughput** — 3,500+ TPS vs Ethereum's 15 TPS
- **Configurable privacy** — hospitals see only what they're authorized to see

```
HEPATOSCAN BLOCKCHAIN NETWORK

   [Hospital A Node]     [Hospital B Node]     [Hospital C Node]
         │                      │                      │
         └──────────────────────┼──────────────────────┘
                                │
                    [Orderer Service — RAFT]
                                │
              [HepatoScan Channel — Hyperledger Fabric]
                                │
         ┌──────────────────────┼──────────────────────┐
         ▼                      ▼                      ▼
  [Scan Registry         [Consent Ledger        [Emergency Alert
   Chaincode]             Chaincode]             Chaincode]
```

### 3.2 What Gets Stored On-Chain vs Off-Chain

**On-Chain (Blockchain — Immutable Record):**
```json
{
  "scan_id": "SCN-2026-04-001",
  "patient_did": "did:hepatoscan:0xABCD1234",
  "hospital_id": "HOSP-APOLLO-MUM",
  "timestamp": "2026-04-16T10:30:00Z",
  "report_hash": "sha256:abc123...",    // Hash proves no tampering
  "li_rads_category": "LR-4",
  "fibrosis_stage": "F3",
  "urgency": "URGENT",
  "access_grants": ["HOSP-FORTIS-DEL", "HOSP-AIIMS-DEL"],
  "tx_id": "0xTRANSACTION_ID"
}
```

**Off-Chain (IPFS + Encrypted MinIO — Actual Data):**
```
- Full DICOM images (encrypted, AES-256)
- Complete AI-generated report (PDF)
- Grad-CAM heatmap overlays
- Segmentation masks
- Full structured JSON report
```

**The Link:** The blockchain stores the HASH and METADATA. The actual data lives encrypted on IPFS. Anyone with chain access can verify the hash to prove data integrity.

### 3.3 How Cross-Hospital Access Works

```
SCENARIO: Patient at Hospital B — previously scanned at Hospital A

Step 1: Hospital B nurse scans patient QR code
Step 2: App calls blockchain API with patient DID
Step 3: Smart contract checks consent ledger → Hospital B is authorized
Step 4: Chaincode returns: list of all scans, report hashes, urgency flags
Step 5: App fetches encrypted report from IPFS using IPFS hash from chain
Step 6: App decrypts with hospital B's authorized key
Step 7: Full liver report appears on screen — 3 seconds total

ZERO phone calls. ZERO faxes. ZERO waiting.
```

---

## 4. MERN Stack Architecture — Complete Redesign

### 4.1 Why Switch to MERN from Python FastAPI + Next.js

| Factor | FastAPI + Next.js (v2) | MERN (v3) |
|---|---|---|
| Language unification | 2 languages (Python + TypeScript) | **1 language — JavaScript/TypeScript everywhere** |
| Real-time capabilities | SSE (limited) | **Native WebSocket + Socket.io** |
| Blockchain SDK | Python web3.py (limited Fabric support) | **Node.js — Hyperledger Fabric SDK native** |
| Developer onboarding | Need Python + JS devs | **One full-stack JS team** |
| JSON handling | Requires serialization | **Native JSON — MongoDB, Node, React all JSON** |
| GraphQL support | Add-on | **Native with Apollo Server** |

**IMPORTANT:** The AI/ML pipeline (MedGemma + Gemma 4 + MONAI) stays in **Python** — it runs as a dedicated microservice. MERN handles everything else: API, auth, database, real-time, blockchain bridge.

### 4.2 MERN Stack Components

```
M — MongoDB (Atlas / On-Prem)
    → Patient records, hospital profiles, scan metadata
    → GridFS for large files (DICOM, heatmaps)
    → Time-series collections for vitals + lab trends

E — Express.js (Node.js)  
    → REST API + GraphQL (Apollo Server)
    → JWT + Wallet-based auth
    → Hyperledger Fabric SDK integration
    → Socket.io for real-time alerts

R — React 18 + TypeScript
    → Hospital Dashboard (multi-hospital view)
    → Emergency Alert Console
    → Patient Timeline (blockchain history)
    → Live AI Thinking Stream

N — Node.js 20 LTS
    → Runtime for Express + Socket.io
    → Blockchain transaction signing
    → IPFS pinning service
    → Job queue (Bull + Redis)
```

---

## 5. Smart Contracts — Medical Automation Logic

### 5.1 Chaincode 1: Scan Registry

```javascript
// File: blockchain/chaincode/scanRegistry/index.js
// Hyperledger Fabric Chaincode — Node.js

'use strict';
const { Contract } = require('fabric-contract-api');

class ScanRegistryContract extends Contract {

  // Register a new scan on the blockchain
  async registerScan(ctx, scanData) {
    const scan = JSON.parse(scanData);
    
    // Validate required fields
    if (!scan.patientDid || !scan.hospitalId || !scan.reportHash) {
      throw new Error('Missing required scan fields');
    }

    // Check if patient has consented to this hospital
    const consentKey = `CONSENT_${scan.patientDid}_${scan.hospitalId}`;
    const consent = await ctx.stub.getState(consentKey);
    if (!consent || consent.length === 0) {
      throw new Error('Patient consent not found for this hospital');
    }

    // Store scan record on ledger
    const scanKey = `SCAN_${scan.scanId}`;
    const scanRecord = {
      ...scan,
      timestamp: new Date().toISOString(),
      txId: ctx.stub.getTxID(),
      status: 'ACTIVE'
    };

    await ctx.stub.putState(scanKey, Buffer.from(JSON.stringify(scanRecord)));

    // Emit event for real-time notifications
    ctx.stub.setEvent('ScanRegistered', Buffer.from(JSON.stringify({
      patientDid: scan.patientDid,
      hospitalId: scan.hospitalId,
      liRads: scan.liRadsCategory,
      urgency: scan.urgency
    })));

    // AUTO-TRIGGER: If LR-5 or F4 or EMERGENT — fire emergency alert
    if (scan.liRadsCategory === 'LR-5' || scan.fibrosisStage === 'F4' || scan.urgency === 'EMERGENT') {
      await this._triggerEmergencyAlert(ctx, scan);
    }

    return JSON.stringify(scanRecord);
  }

  // Get ALL scans for a patient (cross-hospital)
  async getPatientHistory(ctx, patientDid, requestingHospitalId) {
    // First check authorization
    const authorized = await this._checkAuthorization(ctx, patientDid, requestingHospitalId);
    if (!authorized) {
      throw new Error(`Hospital ${requestingHospitalId} not authorized to view patient ${patientDid}`);
    }

    // Query all scans for this patient (across all hospitals)
    const query = {
      selector: {
        patientDid: patientDid,
        status: 'ACTIVE'
      },
      sort: [{ timestamp: 'desc' }]
    };

    const iterator = await ctx.stub.getQueryResult(JSON.stringify(query));
    const scans = [];

    let result = await iterator.next();
    while (!result.done) {
      const scan = JSON.parse(result.value.value.toString());
      scans.push(scan);
      result = await iterator.next();
    }

    return JSON.stringify({
      patientDid,
      totalScans: scans.length,
      scans,
      accessedBy: requestingHospitalId,
      accessTimestamp: new Date().toISOString()
    });
  }

  // Grant cross-hospital access
  async grantHospitalAccess(ctx, patientDid, targetHospitalId, grantedBy, expiryDays) {
    const accessKey = `ACCESS_${patientDid}_${targetHospitalId}`;
    const accessRecord = {
      patientDid,
      targetHospitalId,
      grantedBy,
      grantedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + expiryDays * 86400000).toISOString(),
      status: 'ACTIVE'
    };

    await ctx.stub.putState(accessKey, Buffer.from(JSON.stringify(accessRecord)));

    // Notify target hospital via event
    ctx.stub.setEvent('AccessGranted', Buffer.from(JSON.stringify(accessRecord)));

    return JSON.stringify(accessRecord);
  }

  // Verify report integrity — confirm hash matches what's on chain
  async verifyReportIntegrity(ctx, scanId, reportHash) {
    const scanKey = `SCAN_${scanId}`;
    const scanData = await ctx.stub.getState(scanKey);
    
    if (!scanData || scanData.length === 0) {
      throw new Error(`Scan ${scanId} not found on blockchain`);
    }

    const scan = JSON.parse(scanData.toString());
    const isValid = scan.reportHash === reportHash;

    return JSON.stringify({
      scanId,
      isValid,
      storedHash: scan.reportHash,
      providedHash: reportHash,
      verifiedAt: new Date().toISOString()
    });
  }

  // Internal: Trigger emergency alert smart contract
  async _triggerEmergencyAlert(ctx, scan) {
    const alertKey = `ALERT_${scan.scanId}_${Date.now()}`;
    const alert = {
      type: 'CRITICAL_FINDING',
      scanId: scan.scanId,
      patientDid: scan.patientDid,
      originHospital: scan.hospitalId,
      liRads: scan.liRadsCategory,
      fibrosisStage: scan.fibrosisStage,
      urgency: scan.urgency,
      createdAt: new Date().toISOString(),
      status: 'OPEN'
    };

    await ctx.stub.putState(alertKey, Buffer.from(JSON.stringify(alert)));
    ctx.stub.setEvent('EmergencyAlert', Buffer.from(JSON.stringify(alert)));
  }

  // Internal: Check hospital access authorization
  async _checkAuthorization(ctx, patientDid, hospitalId) {
    // Check direct consent
    const consentKey = `CONSENT_${patientDid}_${hospitalId}`;
    const consent = await ctx.stub.getState(consentKey);
    if (consent && consent.length > 0) return true;

    // Check granted access
    const accessKey = `ACCESS_${patientDid}_${hospitalId}`;
    const access = await ctx.stub.getState(accessKey);
    if (access && access.length > 0) {
      const accessRecord = JSON.parse(access.toString());
      if (accessRecord.status === 'ACTIVE' && new Date(accessRecord.expiresAt) > new Date()) {
        return true;
      }
    }

    return false;
  }
}

module.exports = ScanRegistryContract;
```

### 5.2 Chaincode 2: Consent Management

```javascript
// File: blockchain/chaincode/consentManager/index.js

'use strict';
const { Contract } = require('fabric-contract-api');

class ConsentManagerContract extends Contract {

  // Patient gives consent — one signature, all hospitals
  async giveConsent(ctx, patientDid, hospitalId, scope, validDays) {
    const consentKey = `CONSENT_${patientDid}_${hospitalId}`;
    
    const consent = {
      patientDid,
      hospitalId,
      scope: JSON.parse(scope), // e.g. ["read_reports", "view_scans", "emergency_access"]
      givenAt: new Date().toISOString(),
      expiresAt: validDays === 'permanent' 
        ? null 
        : new Date(Date.now() + parseInt(validDays) * 86400000).toISOString(),
      status: 'ACTIVE',
      txId: ctx.stub.getTxID()
    };

    await ctx.stub.putState(consentKey, Buffer.from(JSON.stringify(consent)));
    
    // Broadcast to all hospitals that patient is now in network
    ctx.stub.setEvent('ConsentGiven', Buffer.from(JSON.stringify({
      patientDid,
      hospitalId,
      scope: JSON.parse(scope)
    })));

    return JSON.stringify(consent);
  }

  // Revoke consent instantly — takes effect immediately across all hospitals
  async revokeConsent(ctx, patientDid, hospitalId) {
    const consentKey = `CONSENT_${patientDid}_${hospitalId}`;
    const consentData = await ctx.stub.getState(consentKey);
    
    if (!consentData || consentData.length === 0) {
      throw new Error('No consent record found');
    }

    const consent = JSON.parse(consentData.toString());
    consent.status = 'REVOKED';
    consent.revokedAt = new Date().toISOString();

    await ctx.stub.putState(consentKey, Buffer.from(JSON.stringify(consent)));
    
    ctx.stub.setEvent('ConsentRevoked', Buffer.from(JSON.stringify({ patientDid, hospitalId })));

    return JSON.stringify({ message: 'Consent revoked', ...consent });
  }

  // Emergency override — ER can access any patient in life-threatening situation
  // Requires 2 hospital admin signatures (multi-sig)
  async emergencyOverride(ctx, patientDid, requestingHospital, emergencyReason, admin1Sig, admin2Sig) {
    // Validate dual admin signatures
    const sigsValid = await this._validateMultiSig(ctx, admin1Sig, admin2Sig);
    if (!sigsValid) throw new Error('Emergency override requires 2 valid admin signatures');

    const overrideKey = `EMERGENCY_OVERRIDE_${patientDid}_${Date.now()}`;
    const override = {
      patientDid,
      requestingHospital,
      emergencyReason,
      validFor: '24_HOURS',
      expiresAt: new Date(Date.now() + 86400000).toISOString(),
      createdAt: new Date().toISOString(),
      admin1Sig,
      admin2Sig,
      auditFlag: 'EMERGENCY_ACCESS — REVIEW REQUIRED'
    };

    await ctx.stub.putState(overrideKey, Buffer.from(JSON.stringify(override)));
    ctx.stub.setEvent('EmergencyOverride', Buffer.from(JSON.stringify(override)));

    return JSON.stringify(override);
  }

  async _validateMultiSig(ctx, sig1, sig2) {
    // Verify cryptographic signatures against registered hospital admin keys
    // Implementation: verify ECDSA signatures on chain
    return sig1 && sig2 && sig1 !== sig2; // Simplified — use real crypto in prod
  }
}

module.exports = ConsentManagerContract;
```

---

## 6. Cross-Hospital Emergency Alert System

### 6.1 How Emergency Alerts Work

```
CRITICAL FINDING DETECTED (LR-5 or F4 or Emergent HCC)
         │
         ▼
Smart Contract fires EmergencyAlert event on blockchain
         │
         ▼
Node.js Socket.io server picks up blockchain event
         │
         ├──→ Push notification to ALL hospitals in patient's consent network
         ├──→ SMS/WhatsApp to on-call radiologist at origin hospital  
         ├──→ Email alert to hepatology team
         └──→ Dashboard "🔴 CRITICAL" banner appears in real-time on all authorized screens

Any Hospital Opens Patient File:
   → Sees full history immediately
   → AI comparison: "Progression from F2 (6 months ago) to F4 (today)"
   → Recommended immediate actions
   → One-click refer to hepatology center
```

### 6.2 Real-Time Alert Service (Node.js + Socket.io)

```javascript
// File: backend/src/services/blockchainEventListener.js

const { Gateway, Wallets } = require('fabric-network');
const { Server } = require('socket.io');

class BlockchainEventListener {
  constructor(io) {
    this.io = io; // Socket.io server instance
    this.gateway = new Gateway();
  }

  async startListening() {
    const wallet = await Wallets.newFileSystemWallet('./wallet');
    
    await this.gateway.connect(connectionProfile, {
      wallet,
      identity: 'HepatoScanAdmin',
      discovery: { enabled: true, asLocalhost: false }
    });

    const network = await this.gateway.getNetwork('hepatoscan-channel');
    const contract = network.getContract('scanRegistry');

    // Listen for critical findings
    await contract.addContractListener(async (event) => {
      const eventName = event.eventName;
      const eventData = JSON.parse(event.payload.toString());

      console.log(`[Blockchain Event]: ${eventName}`, eventData);

      if (eventName === 'EmergencyAlert') {
        await this._handleEmergencyAlert(eventData);
      } else if (eventName === 'ScanRegistered') {
        await this._handleScanRegistered(eventData);
      } else if (eventName === 'AccessGranted') {
        await this._handleAccessGranted(eventData);
      }
    });

    console.log('[BlockchainListener] Listening to HepatoScan channel events...');
  }

  async _handleEmergencyAlert(alertData) {
    // 1. Broadcast to ALL connected hospital dashboards
    this.io.emit('emergency_alert', {
      type: 'CRITICAL',
      patientDid: alertData.patientDid,
      scanId: alertData.scanId,
      liRads: alertData.liRads,
      urgency: alertData.urgency,
      originHospital: alertData.originHospital,
      message: `🔴 CRITICAL: LR-${alertData.liRads} detected. Immediate action required.`,
      timestamp: new Date().toISOString()
    });

    // 2. Send SMS via Twilio to on-call team
    await this._sendSMSAlert(alertData);

    // 3. Push notification via FCM
    await this._sendPushNotification(alertData);

    // 4. Auto-create urgent task in hospital task queue
    await this._createUrgentTask(alertData);
  }

  async _handleScanRegistered(scanData) {
    // Notify authorized hospitals that a new scan is available for a patient they know
    const authorizedHospitals = await this._getAuthorizedHospitals(scanData.patientDid);
    
    authorizedHospitals.forEach(hospitalId => {
      this.io.to(`hospital_${hospitalId}`).emit('new_scan_available', {
        patientDid: scanData.patientDid,
        scanId: scanData.scanId,
        liRads: scanData.liRads,
        scannedAt: scanData.timestamp
      });
    });
  }

  async _sendSMSAlert(alertData) {
    const twilio = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
    const onCallTeam = await this._getOnCallTeam(alertData.originHospital);
    
    for (const doctor of onCallTeam) {
      await twilio.messages.create({
        body: `🔴 HEPATOSCAN CRITICAL: Patient ${alertData.patientDid} | LI-RADS ${alertData.liRads} | ${alertData.urgency}. Log in to HepatoScan immediately.`,
        from: process.env.TWILIO_PHONE,
        to: doctor.phone
      });
    }
  }
}

module.exports = BlockchainEventListener;
```

---

## 7. Decentralized Patient Identity (DID)

### 7.1 How Patient DID Works

Every patient gets a **Decentralized Identifier (DID)** — essentially a blockchain-based ID that works across all hospitals:

```
TRADITIONAL:
  Hospital A Patient ID: 10045
  Hospital B Patient ID: A-2034-2026  
  Hospital C Patient ID: PT/MUM/9871
  → 3 different IDs, no way to link them

HEPATOSCAN DID:
  Patient DID: did:hepatoscan:0x7f3a4b2c...
  → ONE identity, recognized by ALL hospitals on the network
  → QR code on patient's phone
  → Works even if patient is unconscious (emergency scan of QR wristband)
```

### 7.2 DID Registration Flow

```javascript
// File: backend/src/services/didService.js

const crypto = require('crypto');
const { ethers } = require('ethers');

class DIDService {

  // Generate DID for new patient
  async createPatientDID(patientInfo) {
    // 1. Generate keypair for patient
    const wallet = ethers.Wallet.createRandom();
    
    // 2. Create DID document
    const did = `did:hepatoscan:${wallet.address}`;
    const didDocument = {
      '@context': 'https://www.w3.org/ns/did/v1',
      id: did,
      verificationMethod: [{
        id: `${did}#keys-1`,
        type: 'EcdsaSecp256k1VerificationKey2019',
        controller: did,
        publicKeyHex: wallet.publicKey
      }],
      authentication: [`${did}#keys-1`],
      service: [{
        id: `${did}#hepatoscan`,
        type: 'HepatoScanMedicalRecord',
        serviceEndpoint: `https://hepatoscan.ai/patients/${did}`
      }]
    };

    // 3. Anchor DID on blockchain (Hyperledger Fabric)
    await this._anchorDIDOnChain(did, didDocument);

    // 4. Generate QR code for patient wristband / phone
    const QRCode = require('qrcode');
    const qrCodeDataURL = await QRCode.toDataURL(did);

    // 5. Store private key securely (encrypted, only patient has it)
    // Never store on server — give to patient on paper/app
    
    return {
      did,
      didDocument,
      qrCode: qrCodeDataURL,
      privateKey: wallet.privateKey, // Only shown ONCE — patient must save this
      address: wallet.address,
      message: 'Store your private key safely. It cannot be recovered.'
    };
  }

  // Resolve DID — fetch all patient data linked to this identity
  async resolveDID(did, requestingHospitalId) {
    // 1. Verify DID exists on chain
    const didDoc = await this._getDIDFromChain(did);
    if (!didDoc) throw new Error('DID not found on HepatoScan network');

    // 2. Check hospital authorization
    const authorized = await this._checkHospitalAuthorization(did, requestingHospitalId);
    
    return {
      did,
      didDocument: didDoc,
      authorized,
      resolvedAt: new Date().toISOString()
    };
  }
}

module.exports = new DIDService();
```

---

## 8. Full System Architecture — Blockchain + MERN + AI

```
╔══════════════════════════════════════════════════════════════════════════════╗
║               HepatoScan AI v3.0 — Full Architecture                        ║
║        Blockchain + MERN + Gemma 4 + MedGemma 1.5                           ║
╚══════════════════════════════════════════════════════════════════════════════╝

═══════════════════════════════════════
LAYER 1: CLIENT (React 18 + TypeScript)
═══════════════════════════════════════
┌──────────────────┐  ┌─────────────────┐  ┌──────────────────┐  ┌────────────┐
│  Hospital         │  │ Emergency Alert  │  │ Patient Portal   │  │ Mobile App │
│  Dashboard        │  │ Console          │  │ (DID + QR Code)  │  │ (React     │
│  (Multi-Hospital  │  │ (Real-time       │  │ Consent Mgmt     │  │ Native)    │
│  View)            │  │ Socket.io)       │  │                  │  │            │
└──────────┬───────┘  └────────┬────────┘  └────────┬─────────┘  └─────┬──────┘
           └──────────────────┴───────────────────┴──────────────────┘
                                        │
                           HTTPS / REST / GraphQL / WebSocket
                                        │
═══════════════════════════════════════════════════
LAYER 2: MERN API LAYER (Express.js + Node.js 20)
═══════════════════════════════════════════════════
┌────────────────────────────────────────────────────────────────────────────┐
│                          Express.js API Server                              │
│                                                                             │
│  ┌──────────────┐  ┌────────────────┐  ┌──────────────┐  ┌─────────────┐  │
│  │ REST API      │  │ GraphQL        │  │ Socket.io    │  │ Bull Queue  │  │
│  │ /api/v3/      │  │ Apollo Server  │  │ Real-time    │  │ Job Queue   │  │
│  │ patients      │  │ /graphql       │  │ Alerts       │  │ AI Jobs     │  │
│  │ scans         │  │                │  │              │  │             │  │
│  │ hospitals     │  │                │  │              │  │             │  │
│  └──────────────┘  └────────────────┘  └──────────────┘  └─────────────┘  │
│                                                                             │
│  ┌──────────────┐  ┌────────────────┐  ┌──────────────┐                   │
│  │ JWT + Wallet  │  │ Blockchain     │  │ IPFS Client  │                   │
│  │ Auth          │  │ SDK Bridge     │  │ (Kubo)       │                   │
│  │               │  │ (Fabric SDK)   │  │              │                   │
│  └──────────────┘  └────────────────┘  └──────────────┘                   │
└────────────────────────────────────────────────────────────────────────────┘
                    │                              │
          ┌─────────┘                    ┌─────────┘
          ▼                              ▼
═══════════════════             ══════════════════════════
LAYER 3A: MONGODB               LAYER 3B: AI MICROSERVICE
═══════════════════             ══════════════════════════
┌──────────────────┐            ┌─────────────────────────┐
│ MongoDB Atlas    │            │ Python FastAPI           │
│ / On-Prem        │            │ (AI-only microservice)   │
│                  │            │                          │
│ Collections:     │            │ MedGemma 1.5 4B          │
│ • patients       │            │ Gemma 4 31B              │
│ • scans          │            │ MONAI U-Net              │
│ • hospitals      │            │ Grad-CAM                 │
│ • alerts         │            │ PyRadiomics              │
│ • audit_logs     │            │                          │
│                  │            │ Port: 8001               │
│ GridFS:          │            │ Celery + Redis queue     │
│ • DICOM files    │            └─────────────────────────┘
│ • PDF reports    │
│ • Heatmaps       │
└──────────────────┘
                    │
          ┌─────────┘
          ▼
═══════════════════════════════════════════════
LAYER 4: BLOCKCHAIN (Hyperledger Fabric)
═══════════════════════════════════════════════
┌────────────────────────────────────────────────────────────────────────────┐
│                     HepatoScan Blockchain Network                           │
│                                                                             │
│  ┌─────────────┐   ┌──────────────────┐   ┌──────────────────────────┐    │
│  │ Scan         │   │ Consent Ledger   │   │ Emergency Alert          │    │
│  │ Registry     │   │ Chaincode        │   │ Chaincode                │    │
│  │ Chaincode    │   │                  │   │                          │    │
│  │              │   │ Patient signs    │   │ Smart contract fires     │    │
│  │ Immutable    │   │ once — valid     │   │ when LR-5/F4 detected    │    │
│  │ report hash  │   │ everywhere       │   │                          │    │
│  └─────────────┘   └──────────────────┘   └──────────────────────────┘    │
│                                                                             │
│  Hospital A Node ——— Hospital B Node ——— Hospital C Node ——— (N nodes)     │
└────────────────────────────────────────────────────────────────────────────┘
                    │
          ┌─────────┘
          ▼
════════════════════════════════
LAYER 5: DISTRIBUTED STORAGE
════════════════════════════════
┌──────────────────┐   ┌──────────────────┐
│ IPFS (Kubo)      │   │ MinIO            │
│                  │   │ (On-Prem S3)     │
│ Encrypted DICOM  │   │                  │
│ PDF Reports      │   │ Raw DICOM backup │
│ AI Heatmaps      │   │ Model weights    │
│                  │   │                  │
│ Hash anchored    │   │ Hospital-local   │
│ on blockchain    │   │ storage          │
└──────────────────┘   └──────────────────┘
```

---

## 9. Complete File Structure — MERN + Blockchain

```
hepatoscan-ai-v3/
│
├── 📁 frontend/                          # React 18 + TypeScript
│   ├── 📁 src/
│   │   ├── 📁 pages/
│   │   │   ├── Dashboard.tsx             # Multi-hospital overview
│   │   │   ├── EmergencyConsole.tsx      # Real-time critical alerts
│   │   │   ├── PatientTimeline.tsx       # Full blockchain history view
│   │   │   ├── ScanUpload.tsx            # DICOM upload + AI trigger
│   │   │   ├── ReportViewer.tsx          # AI report with blockchain proof
│   │   │   ├── ConsentManager.tsx        # Patient consent UI
│   │   │   └── HospitalNetwork.tsx       # Blockchain network map
│   │   │
│   │   ├── 📁 components/
│   │   │   ├── BlockchainVerifier.tsx    # Show on-chain proof badge
│   │   │   ├── CrossHospitalHistory.tsx  # Timeline across hospitals
│   │   │   ├── EmergencyAlertBanner.tsx  # Real-time critical alert
│   │   │   ├── DIDScanner.tsx            # QR code patient scanner
│   │   │   ├── DicomViewer.tsx           # Cornerstone3D
│   │   │   ├── HeatmapOverlay.tsx        # Grad-CAM overlay
│   │   │   ├── AIThinkingStream.tsx      # Gemma 4 thinking mode live
│   │   │   ├── LiRadsGauge.tsx           # LI-RADS visual scale
│   │   │   ├── FibrosisProgressBar.tsx   # F0-F4 with trend arrow
│   │   │   ├── ConsentCard.tsx           # Patient consent status
│   │   │   └── NetworkStatusBadge.tsx    # Blockchain node status
│   │   │
│   │   ├── 📁 hooks/
│   │   │   ├── useSocket.ts              # Socket.io real-time hook
│   │   │   ├── useBlockchain.ts          # Fabric SDK React hook
│   │   │   ├── usePatientDID.ts          # DID resolution hook
│   │   │   └── useAIStream.ts            # Server-sent events for AI
│   │   │
│   │   ├── 📁 store/
│   │   │   ├── alertStore.ts             # Zustand: emergency alerts
│   │   │   ├── patientStore.ts           # Zustand: patient data
│   │   │   └── hospitalStore.ts          # Zustand: hospital network
│   │   │
│   │   └── 📁 lib/
│   │       ├── api.ts                    # Axios API client
│   │       ├── graphql.ts                # Apollo client
│   │       ├── socket.ts                 # Socket.io client
│   │       └── qrScanner.ts             # QR code / DID scanner
│   │
│   ├── package.json
│   └── vite.config.ts
│
├── 📁 backend/                           # Node.js + Express.js (MERN)
│   ├── 📁 src/
│   │   ├── 📁 models/                    # Mongoose schemas
│   │   │   ├── Patient.model.js          # Patient + DID fields
│   │   │   ├── Scan.model.js             # Scan + blockchain hash ref
│   │   │   ├── Hospital.model.js         # Hospital network node
│   │   │   ├── Alert.model.js            # Emergency alerts
│   │   │   ├── Consent.model.js          # Local consent cache
│   │   │   └── AuditLog.model.js         # Access audit trail
│   │   │
│   │   ├── 📁 routes/
│   │   │   ├── patients.routes.js        # CRUD + DID lookup
│   │   │   ├── scans.routes.js           # Upload + AI trigger
│   │   │   ├── blockchain.routes.js      # Chain query endpoints
│   │   │   ├── consent.routes.js         # Consent management
│   │   │   ├── hospitals.routes.js       # Network management
│   │   │   └── alerts.routes.js          # Alert management
│   │   │
│   │   ├── 📁 controllers/
│   │   │   ├── scanController.js         # Upload → AI → Blockchain
│   │   │   ├── patientController.js      # Patient + DID ops
│   │   │   ├── blockchainController.js   # Fabric SDK operations
│   │   │   ├── alertController.js        # Alert management
│   │   │   └── consentController.js      # Consent operations
│   │   │
│   │   ├── 📁 services/
│   │   │   ├── blockchainService.js      # Hyperledger Fabric SDK
│   │   │   ├── blockchainEventListener.js # Chain event listener
│   │   │   ├── aiService.js              # Call Python AI microservice
│   │   │   ├── ipfsService.js            # IPFS upload/download
│   │   │   ├── didService.js             # DID creation + resolution
│   │   │   ├── notificationService.js    # SMS + Push + Email
│   │   │   └── auditService.js           # Audit log service
│   │   │
│   │   ├── 📁 graphql/
│   │   │   ├── schema.graphql            # GraphQL type definitions
│   │   │   ├── resolvers/
│   │   │   │   ├── patientResolvers.js
│   │   │   │   ├── scanResolvers.js
│   │   │   │   └── alertResolvers.js
│   │   │   └── dataSources.js
│   │   │
│   │   ├── 📁 middleware/
│   │   │   ├── auth.middleware.js        # JWT + wallet verification
│   │   │   ├── rbac.middleware.js        # Role-based access
│   │   │   ├── audit.middleware.js       # Auto-log all access
│   │   │   └── rateLimit.middleware.js
│   │   │
│   │   ├── 📁 jobs/                      # Bull queue workers
│   │   │   ├── aiProcessingJob.js        # Async AI scan processing
│   │   │   ├── blockchainSyncJob.js      # Sync chain events to MongoDB
│   │   │   └── alertJob.js              # Send delayed alerts
│   │   │
│   │   ├── app.js                        # Express + Socket.io setup
│   │   └── server.js                     # Entry point
│   │
│   ├── package.json
│   └── Dockerfile
│
├── 📁 ai-service/                        # Python FastAPI (AI ONLY)
│   ├── 📁 ml/
│   │   ├── medgemma_client.py            # MedGemma 1.5 inference
│   │   ├── gemma4_client.py              # Gemma 4 31B report gen
│   │   ├── segment_liver.py             # MONAI U-Net segmentation
│   │   ├── gradcam.py                    # Explainability maps
│   │   └── dicom_preprocessor.py        # DICOM → PIL slices
│   │
│   ├── 📁 api/
│   │   └── routes.py                     # FastAPI: /analyze endpoint
│   │
│   ├── main.py
│   ├── requirements.txt
│   └── Dockerfile
│
├── 📁 blockchain/                         # Hyperledger Fabric
│   ├── 📁 chaincode/
│   │   ├── 📁 scanRegistry/
│   │   │   ├── index.js                  # Scan Registry chaincode
│   │   │   └── package.json
│   │   ├── 📁 consentManager/
│   │   │   ├── index.js                  # Consent chaincode
│   │   │   └── package.json
│   │   └── 📁 emergencyAlert/
│   │       ├── index.js                  # Emergency alert chaincode
│   │       └── package.json
│   │
│   ├── 📁 network/
│   │   ├── docker-compose.yaml           # Fabric network (CA + Peer + Orderer)
│   │   ├── configtx.yaml                 # Channel + policy config
│   │   ├── crypto-config.yaml            # Org MSP config
│   │   └── 📁 scripts/
│   │       ├── network-up.sh             # Start blockchain network
│   │       ├── deploy-chaincode.sh       # Deploy all chaincodes
│   │       └── add-hospital.sh           # Onboard new hospital
│   │
│   └── 📁 wallet/                        # Identity wallets (gitignored)
│
├── 📁 infrastructure/
│   ├── docker-compose.yml                # Full stack (MERN + AI + Chain)
│   ├── docker-compose.prod.yml
│   ├── 📁 nginx/nginx.conf
│   └── 📁 monitoring/
│       ├── grafana/
│       └── prometheus/
│
├── 📁 docs/
│   ├── BLOCKCHAIN_SETUP.md
│   ├── HOSPITAL_ONBOARDING.md
│   ├── PATIENT_DID_GUIDE.md
│   └── API.md
│
├── README.md
└── Makefile
```

---

## 10. Complete Tech Stack v3.0

### 10.1 Frontend

| Layer | Technology | Version | Why |
|---|---|---|---|
| Framework | **React 18** | 18.3+ | Concurrent rendering, Suspense |
| Build Tool | **Vite** | 5.x | 10x faster than CRA, native ESM |
| Language | **TypeScript** | 5.x | Type safety |
| Styling | **Tailwind CSS** + **shadcn/ui** | 3.4+ | Consistent design system |
| State | **Zustand** | 4.5+ | Lightweight global state |
| Real-time | **Socket.io Client** | 4.x | Emergency alerts, live updates |
| Data Fetching | **TanStack Query** | 5.x | Caching, background updates |
| GraphQL | **Apollo Client** | 3.x | Rich hospital data queries |
| DICOM Viewer | **Cornerstone3D** | Latest | 3D DICOM rendering |
| Charts | **Recharts** + **D3.js** | — | Trend charts, fibrosis timeline |
| QR Scanner | **html5-qrcode** | — | Patient DID scan at reception |
| PDF | **react-pdf** | — | Report viewing |
| Auth | **Clerk** or custom JWT | — | Hospital SSO |

### 10.2 Backend (MERN — Node.js + Express)

| Layer | Technology | Version | Why |
|---|---|---|---|
| Runtime | **Node.js** | 20 LTS | Long-term support, native fetch |
| Framework | **Express.js** | 4.x | Battle-tested, flexible |
| Database | **MongoDB** | 7.x | Native JSON, GridFS for DICOM |
| ODM | **Mongoose** | 8.x | Schema validation, virtuals |
| Real-time | **Socket.io** | 4.x | Bi-directional WebSocket |
| GraphQL | **Apollo Server** | 4.x | Schema-first API |
| Job Queue | **Bull** + **Redis** | — | Async AI job processing |
| Auth | **jsonwebtoken** + **bcrypt** | — | Secure JWT |
| Blockchain SDK | **fabric-network** (Hyperledger) | 2.x | Native Fabric JS SDK |
| IPFS | **kubo-rpc-client** | — | Decentralized storage |
| SMS | **Twilio** | — | Emergency alerts |
| Email | **Nodemailer** + **SendGrid** | — | Report delivery |
| Validation | **Zod** | 3.x | Runtime type validation |
| Logging | **Winston** + **Morgan** | — | Structured logs |

### 10.3 AI/ML Stack (Python Microservice — Unchanged)

| Component | Technology | Notes |
|---|---|---|
| AI Framework | **PyTorch 2.3+** | — |
| Medical AI | **MedGemma 1.5 4B** | `google/medgemma-1.5-4b-it` |
| Report Gen | **Gemma 4 31B** | `google/gemma-4-31b-it` |
| Segmentation | **MONAI U-Net** | Pre-trained liver model |
| Explainability | **pytorch-grad-cam** | Grad-CAM++ |
| Fine-tuning | **PEFT QLoRA** | LoRA on liver datasets |
| API | **FastAPI** | Python AI microservice on port 8001 |
| Queue | **Celery + Redis** | Async scan processing |

### 10.4 Blockchain Stack

| Component | Technology | Why |
|---|---|---|
| Blockchain | **Hyperledger Fabric 2.5** | Permissioned, HIPAA-safe, no gas fees |
| Chaincode | **Node.js** | Same language as backend |
| Storage | **IPFS (Kubo)** | Decentralized, hash-verified |
| Identity | **Fabric CA** + **Custom DID** | Hospital + patient identity |
| Consensus | **RAFT** orderer | Fast, crash-fault-tolerant |
| Explorer | **Hyperledger Explorer** | Block viewer dashboard |

### 10.5 Infrastructure

| Tool | Purpose |
|---|---|
| Docker + Docker Compose | Full reproducible environment |
| Nginx | Reverse proxy, SSL termination |
| Redis | Bull queue + Socket.io adapter + cache |
| MinIO | S3-compatible on-prem file storage |
| GitHub Actions | CI/CD pipeline |
| Grafana + Prometheus | Monitoring + alerts |
| Let's Encrypt | SSL certificates |

---

## 11. AI/ML Pipeline (Unchanged — Still Best-in-Class)

The Python AI microservice is called by the Node.js backend via internal HTTP. All code from v2.0 is preserved:

- **Stage 1:** DICOM Preprocessing → pydicom + SimpleITK
- **Stage 2:** Liver Segmentation → MONAI U-Net
- **Stage 3:** Grad-CAM Explainability → pytorch-grad-cam
- **Stage 4:** MedGemma 1.5 4B → 3D CT volume interpretation
- **Stage 5:** Gemma 4 31B → Clinical report generation (Thinking Mode)
- **Stage 6:** Gemma 4 Function Calling → Agentic workflow

**New in v3.0 — Post-AI Step:**
- **Stage 7:** Hash report → Store hash on blockchain → Upload encrypted report to IPFS
- **Stage 8:** Smart contract checks if critical → fires EmergencyAlert if LR-5/F4

---

## 12. MERN Backend — Full Code

### 12.1 Express + Socket.io App Setup

```javascript
// File: backend/src/app.js

const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');

const { typeDefs, resolvers } = require('./graphql');
const BlockchainEventListener = require('./services/blockchainEventListener');
const authMiddleware = require('./middleware/auth.middleware');
const auditMiddleware = require('./middleware/audit.middleware');

// Routes
const patientsRouter = require('./routes/patients.routes');
const scansRouter = require('./routes/scans.routes');
const blockchainRouter = require('./routes/blockchain.routes');
const alertsRouter = require('./routes/alerts.routes');
const consentRouter = require('./routes/consent.routes');

const app = express();
const httpServer = createServer(app);

// Socket.io with Redis adapter for multi-server
const io = new Server(httpServer, {
  cors: { origin: process.env.FRONTEND_URL, methods: ['GET', 'POST'] },
  adapter: require('@socket.io/redis-adapter').createAdapter(
    require('redis').createClient({ url: process.env.REDIS_URL })
  )
});

// Middleware
app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json({ limit: '500mb' })); // Large DICOM uploads
app.use(auditMiddleware); // Auto-log all requests

// REST Routes
app.use('/api/v3/patients', authMiddleware, patientsRouter);
app.use('/api/v3/scans', authMiddleware, scansRouter(io)); // Pass io for real-time
app.use('/api/v3/blockchain', authMiddleware, blockchainRouter);
app.use('/api/v3/alerts', authMiddleware, alertsRouter);
app.use('/api/v3/consent', authMiddleware, consentRouter);

// GraphQL
const apolloServer = new ApolloServer({ typeDefs, resolvers });
await apolloServer.start();
app.use('/graphql', expressMiddleware(apolloServer, {
  context: async ({ req }) => ({ token: req.headers.authorization, io })
}));

// Socket.io — Hospital Rooms
io.on('connection', (socket) => {
  const { hospitalId } = socket.handshake.query;
  
  if (hospitalId) {
    socket.join(`hospital_${hospitalId}`);
    console.log(`Hospital ${hospitalId} connected`);
  }

  socket.on('subscribe_patient', (patientDid) => {
    socket.join(`patient_${patientDid}`);
  });

  socket.on('disconnect', () => {
    console.log(`Socket ${socket.id} disconnected`);
  });
});

// Start blockchain event listener
const blockchainListener = new BlockchainEventListener(io);
await blockchainListener.startListening();

module.exports = { app, httpServer };
```

### 12.2 Scan Controller — The Core Flow

```javascript
// File: backend/src/controllers/scanController.js

const Scan = require('../models/Scan.model');
const Patient = require('../models/Patient.model');
const aiService = require('../services/aiService');
const blockchainService = require('../services/blockchainService');
const ipfsService = require('../services/ipfsService');
const auditService = require('../services/auditService');
const crypto = require('crypto');

class ScanController {

  // Main flow: Upload DICOM → Run AI → Store on Blockchain
  async processScan(req, res) {
    const { patientDid, hospitalId, modality, patientContext } = req.body;
    const dicomFile = req.file; // Multer file upload

    try {
      // 1. Create scan record in MongoDB
      const scan = await Scan.create({
        patientDid,
        hospitalId,
        modality,
        status: 'PROCESSING',
        uploadedAt: new Date()
      });

      // Acknowledge immediately — AI takes 15-60 seconds
      res.status(202).json({
        message: 'Scan received. Processing started.',
        scanId: scan._id,
        estimatedTime: '15-60 seconds'
      });

      // 2. Run AI pipeline (async — Python microservice)
      const aiResult = await aiService.analyzeScan({
        dicomPath: dicomFile.path,
        patientContext: JSON.parse(patientContext),
        modality
      });

      // 3. Generate report hash for blockchain
      const reportJson = JSON.stringify(aiResult.report);
      const reportHash = crypto.createHash('sha256').update(reportJson).digest('hex');

      // 4. Upload encrypted report + heatmap to IPFS
      const ipfsResult = await ipfsService.uploadEncrypted({
        report: aiResult.report,
        heatmap: aiResult.heatmapBase64,
        pdfPath: aiResult.pdfPath,
        encryptionKey: process.env.IPFS_ENCRYPTION_KEY
      });

      // 5. Register scan on blockchain (immutable record)
      const chainResult = await blockchainService.registerScan({
        scanId: scan._id.toString(),
        patientDid,
        hospitalId,
        reportHash,
        ipfsHash: ipfsResult.cid,
        liRadsCategory: aiResult.report.li_rads,
        fibrosisStage: aiResult.report.fibrosis_stage,
        urgency: aiResult.report.urgency,
        timestamp: new Date().toISOString()
      });

      // 6. Update MongoDB with results + chain reference
      await Scan.findByIdAndUpdate(scan._id, {
        status: 'COMPLETED',
        aiReport: aiResult.report,
        heatmapUrl: aiResult.heatmapUrl,
        reportPdfUrl: aiResult.pdfPath,
        blockchainTxId: chainResult.txId,
        reportHash,
        ipfsHash: ipfsResult.cid,
        liRads: aiResult.report.li_rads,
        fibrosisStage: aiResult.report.fibrosis_stage,
        urgency: aiResult.report.urgency,
        completedAt: new Date()
      });

      // 7. Audit log
      await auditService.log({
        action: 'SCAN_PROCESSED',
        scanId: scan._id,
        patientDid,
        hospitalId,
        performedBy: req.user.id,
        blockchainTxId: chainResult.txId
      });

      // 8. Emit real-time update to all authorized hospitals
      req.io.to(`patient_${patientDid}`).emit('scan_completed', {
        scanId: scan._id,
        patientDid,
        liRads: aiResult.report.li_rads,
        urgency: aiResult.report.urgency,
        blockchainVerified: true,
        txId: chainResult.txId
      });

      console.log(`[ScanController] Scan ${scan._id} processed. TxID: ${chainResult.txId}`);

    } catch (error) {
      await Scan.findByIdAndUpdate(req.scanId, {
        status: 'ERROR',
        errorMessage: error.message
      });
      console.error('[ScanController] Error:', error);
    }
  }

  // Cross-hospital patient history lookup
  async getPatientHistory(req, res) {
    const { patientDid } = req.params;
    const { hospitalId } = req.user; // From JWT

    try {
      // Query blockchain for ALL scans across all hospitals
      const chainHistory = await blockchainService.getPatientHistory(patientDid, hospitalId);
      
      if (!chainHistory.authorized) {
        return res.status(403).json({
          error: 'Hospital not authorized to view this patient',
          message: 'Request patient consent via /api/v3/consent/request'
        });
      }

      // Fetch full reports from MongoDB (for this hospital's own scans)
      // And metadata only for other hospitals' scans (privacy-respecting)
      const localScans = await Scan.find({
        patientDid,
        hospitalId,
        status: 'COMPLETED'
      }).sort({ completedAt: -1 });

      // Merge blockchain cross-hospital metadata with local full data
      const mergedHistory = {
        patientDid,
        totalScansNetworkWide: chainHistory.totalScans,
        yourScans: localScans,
        otherHospitalScans: chainHistory.scans.filter(s => s.hospitalId !== hospitalId).map(s => ({
          scanId: s.scanId,
          hospitalId: s.hospitalId,
          liRads: s.liRadsCategory,
          fibrosisStage: s.fibrosisStage,
          urgency: s.urgency,
          timestamp: s.timestamp,
          blockchainVerified: true,
          canRequestFullReport: true // Button to request full report access
        })),
        progressionSummary: this._calculateProgression(chainHistory.scans)
      };

      // Audit this access
      await auditService.log({
        action: 'PATIENT_HISTORY_ACCESSED',
        patientDid,
        accessedBy: hospitalId,
        totalScansViewed: chainHistory.totalScans
      });

      res.json(mergedHistory);

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Calculate disease progression from blockchain scan history
  _calculateProgression(scans) {
    if (scans.length < 2) return { status: 'INSUFFICIENT_DATA' };
    
    const sorted = scans.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    const first = sorted[0];
    const last = sorted[sorted.length - 1];
    
    const fibrosisMap = { 'F0': 0, 'F1': 1, 'F2': 2, 'F3': 3, 'F4': 4 };
    const progression = (fibrosisMap[last.fibrosisStage] || 0) - (fibrosisMap[first.fibrosisStage] || 0);
    
    return {
      firstScanDate: first.timestamp,
      latestScanDate: last.timestamp,
      fibrosisProgression: progression > 0 ? `+${progression} stages` : `${progression} stages`,
      liRadsHistory: sorted.map(s => ({ date: s.timestamp, liRads: s.liRadsCategory })),
      trend: progression > 1 ? 'WORSENING' : progression <= 0 ? 'STABLE_OR_IMPROVING' : 'MILD_PROGRESSION'
    };
  }
}

module.exports = new ScanController();
```

### 12.3 GraphQL Schema

```graphql
# File: backend/src/graphql/schema.graphql

type Query {
  # Get patient full history (cross-hospital, blockchain-verified)
  patientHistory(patientDid: String!, requestingHospitalId: String!): PatientHistory!
  
  # Get single scan with blockchain proof
  scan(scanId: ID!): Scan!
  
  # Get all active emergency alerts
  emergencyAlerts(hospitalId: String): [EmergencyAlert!]!
  
  # Get hospital network status
  hospitalNetwork: [HospitalNode!]!
  
  # Verify report integrity on blockchain
  verifyReport(scanId: ID!, reportHash: String!): VerificationResult!
}

type Mutation {
  # Upload scan and trigger AI analysis
  uploadScan(input: ScanInput!): ScanJob!
  
  # Grant cross-hospital access
  grantAccess(patientDid: String!, targetHospitalId: String!, days: Int): AccessGrant!
  
  # Revoke access
  revokeAccess(patientDid: String!, hospitalId: String!): Boolean!
  
  # Emergency override (requires dual admin auth)
  emergencyOverride(patientDid: String!, reason: String!, admin1Sig: String!, admin2Sig: String!): EmergencyAccess!
  
  # Acknowledge emergency alert
  acknowledgeAlert(alertId: ID!, acknowledgedBy: String!): EmergencyAlert!
}

type Subscription {
  # Real-time emergency alerts
  emergencyAlerts(hospitalId: String!): EmergencyAlert!
  
  # Scan processing updates
  scanProgress(scanId: ID!): ScanProgressUpdate!
}

type PatientHistory {
  patientDid: String!
  totalScansNetworkWide: Int!
  yourScans: [Scan!]!
  otherHospitalScans: [OtherHospitalScan!]!
  progressionSummary: ProgressionSummary!
  blockchainVerified: Boolean!
}

type Scan {
  id: ID!
  patientDid: String!
  hospitalId: String!
  modality: String!
  status: ScanStatus!
  aiReport: AIReport
  liRads: String
  fibrosisStage: String
  urgency: UrgencyLevel
  blockchainTxId: String
  reportHash: String
  ipfsHash: String
  blockchainVerified: Boolean!
  completedAt: String
}

type AIReport {
  indication: String
  technique: String
  findings: String
  impression: String
  liRadsCategory: String
  liRadsScore: Int
  fibrosisStage: String
  fibrosisConfidence: Float
  recommendation: String
  urgency: String
  followUpTimeline: String
  confidenceScores: ConfidenceScores
  thinkingProcess: String
}

type EmergencyAlert {
  id: ID!
  type: AlertType!
  patientDid: String!
  scanId: String!
  originHospital: String!
  liRads: String!
  urgency: UrgencyLevel!
  acknowledged: Boolean!
  acknowledgedBy: String
  createdAt: String!
}

type VerificationResult {
  scanId: ID!
  isValid: Boolean!
  storedHash: String!
  verifiedAt: String!
  blockchainTxId: String!
}

enum ScanStatus { UPLOADING PROCESSING COMPLETED ERROR }
enum UrgencyLevel { ROUTINE URGENT EMERGENT }
enum AlertType { CRITICAL_FINDING PROGRESSION_DETECTED FOLLOW_UP_DUE }
```

---

## 13. Blockchain Layer — Full Code

### 13.1 Blockchain Service (Node.js Fabric SDK)

```javascript
// File: backend/src/services/blockchainService.js

const { Gateway, Wallets } = require('fabric-network');
const path = require('path');
const fs = require('fs');

class BlockchainService {
  constructor() {
    this.gateway = null;
    this.network = null;
    this.walletPath = path.join(process.cwd(), 'wallet');
  }

  async connect() {
    // Load connection profile
    const ccpPath = path.join(process.cwd(), 'blockchain', 'connection-profile.json');
    const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

    // Load wallet
    const wallet = await Wallets.newFileSystemWallet(this.walletPath);
    
    // Check identity exists
    const identity = await wallet.get('HepatoScanAdmin');
    if (!identity) {
      throw new Error('Identity "HepatoScanAdmin" not found in wallet. Run enrollment script first.');
    }

    // Connect to gateway
    this.gateway = new Gateway();
    await this.gateway.connect(ccp, {
      wallet,
      identity: 'HepatoScanAdmin',
      discovery: { enabled: true, asLocalhost: process.env.NODE_ENV !== 'production' }
    });

    this.network = await this.gateway.getNetwork('hepatoscan-channel');
    console.log('[BlockchainService] Connected to HepatoScan channel');
  }

  // Register scan on blockchain
  async registerScan(scanData) {
    if (!this.network) await this.connect();
    
    const contract = this.network.getContract('scanRegistry');
    const result = await contract.submitTransaction(
      'registerScan',
      JSON.stringify(scanData)
    );

    return JSON.parse(result.toString());
  }

  // Get patient cross-hospital history
  async getPatientHistory(patientDid, requestingHospitalId) {
    if (!this.network) await this.connect();
    
    const contract = this.network.getContract('scanRegistry');
    const result = await contract.evaluateTransaction(
      'getPatientHistory',
      patientDid,
      requestingHospitalId
    );

    return JSON.parse(result.toString());
  }

  // Grant hospital access via blockchain
  async grantHospitalAccess(patientDid, targetHospitalId, grantedBy, expiryDays) {
    if (!this.network) await this.connect();
    
    const contract = this.network.getContract('scanRegistry');
    const result = await contract.submitTransaction(
      'grantHospitalAccess',
      patientDid,
      targetHospitalId,
      grantedBy,
      expiryDays.toString()
    );

    return JSON.parse(result.toString());
  }

  // Verify report integrity
  async verifyReport(scanId, reportHash) {
    if (!this.network) await this.connect();
    
    const contract = this.network.getContract('scanRegistry');
    const result = await contract.evaluateTransaction(
      'verifyReportIntegrity',
      scanId,
      reportHash
    );

    return JSON.parse(result.toString());
  }

  // Get transaction history for scan (full audit trail)
  async getScanAuditTrail(scanId) {
    if (!this.network) await this.connect();
    
    const contract = this.network.getContract('scanRegistry');
    const result = await contract.evaluateTransaction('getScanHistory', scanId);
    
    const history = JSON.parse(result.toString());
    return history.map(entry => ({
      txId: entry.TxId,
      timestamp: entry.Timestamp,
      value: JSON.parse(entry.Value),
      isDelete: entry.IsDelete
    }));
  }

  // Give patient consent on blockchain
  async giveConsent(patientDid, hospitalId, scope, validDays) {
    if (!this.network) await this.connect();
    
    const contract = this.network.getContract('consentManager');
    const result = await contract.submitTransaction(
      'giveConsent',
      patientDid,
      hospitalId,
      JSON.stringify(scope),
      validDays
    );

    return JSON.parse(result.toString());
  }
}

module.exports = new BlockchainService();
```

### 13.2 IPFS Service — Encrypted Medical Data Storage

```javascript
// File: backend/src/services/ipfsService.js

const { create } = require('kubo-rpc-client');
const crypto = require('crypto');
const fs = require('fs');

class IPFSService {
  constructor() {
    this.client = create({ url: process.env.IPFS_API_URL || 'http://localhost:5001' });
  }

  // Encrypt and upload to IPFS
  async uploadEncrypted({ report, heatmap, pdfPath, encryptionKey }) {
    const bundle = {
      report,
      heatmap,
      pdf: fs.existsSync(pdfPath) ? fs.readFileSync(pdfPath).toString('base64') : null,
      uploadedAt: new Date().toISOString()
    };

    // AES-256-GCM encryption
    const iv = crypto.randomBytes(16);
    const key = crypto.scryptSync(encryptionKey, 'hepatoscan-salt', 32);
    const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
    
    const jsonData = JSON.stringify(bundle);
    const encrypted = Buffer.concat([
      cipher.update(jsonData, 'utf8'),
      cipher.final()
    ]);
    const authTag = cipher.getAuthTag();

    // Package IV + authTag + encrypted data
    const encryptedBundle = Buffer.concat([iv, authTag, encrypted]);

    // Upload to IPFS
    const result = await this.client.add(encryptedBundle);
    await this.client.pin.add(result.cid); // Pin to prevent garbage collection
    
    return {
      cid: result.cid.toString(),
      size: result.size,
      uploadedAt: new Date().toISOString()
    };
  }

  // Download and decrypt from IPFS
  async downloadDecrypted(cid, encryptionKey) {
    const chunks = [];
    for await (const chunk of this.client.cat(cid)) {
      chunks.push(chunk);
    }
    
    const encryptedBundle = Buffer.concat(chunks);
    const iv = encryptedBundle.slice(0, 16);
    const authTag = encryptedBundle.slice(16, 32);
    const encrypted = encryptedBundle.slice(32);

    const key = crypto.scryptSync(encryptionKey, 'hepatoscan-salt', 32);
    const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
    decipher.setAuthTag(authTag);

    const decrypted = Buffer.concat([
      decipher.update(encrypted),
      decipher.final()
    ]);

    return JSON.parse(decrypted.toString('utf8'));
  }
}

module.exports = new IPFSService();
```

---

## 14. React Frontend — Advanced UI

### 14.1 Emergency Alert Console Component

```tsx
// File: frontend/src/pages/EmergencyConsole.tsx

import { useEffect, useState } from 'react';
import { useSocket } from '../hooks/useSocket';
import { EmergencyAlertBanner } from '../components/EmergencyAlertBanner';
import { CrossHospitalHistory } from '../components/CrossHospitalHistory';
import { BlockchainVerifier } from '../components/BlockchainVerifier';

interface EmergencyAlert {
  id: string;
  patientDid: string;
  scanId: string;
  liRads: string;
  urgency: 'URGENT' | 'EMERGENT';
  originHospital: string;
  timestamp: string;
  acknowledged: boolean;
}

export default function EmergencyConsole() {
  const [alerts, setAlerts] = useState<EmergencyAlert[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;

    // Real-time emergency alerts from blockchain events
    socket.on('emergency_alert', (alert: EmergencyAlert) => {
      setAlerts(prev => [alert, ...prev]);
      
      // Browser notification
      if (Notification.permission === 'granted') {
        new Notification('🔴 HepatoScan Critical Alert', {
          body: `Patient ${alert.patientDid} | LI-RADS ${alert.liRads} | ${alert.urgency}`,
          icon: '/hepatoscan-icon.png',
          requireInteraction: true
        });
      }

      // Audio alert
      new Audio('/critical-alert.mp3').play();
    });

    socket.on('scan_completed', (data) => {
      if (data.urgency !== 'ROUTINE') {
        setAlerts(prev => [{
          ...data,
          type: 'SCAN_RESULT',
          timestamp: new Date().toISOString()
        }, ...prev]);
      }
    });

    return () => {
      socket.off('emergency_alert');
      socket.off('scan_completed');
    };
  }, [socket]);

  const acknowledgeAlert = async (alertId: string) => {
    await fetch(`/api/v3/alerts/${alertId}/acknowledge`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    setAlerts(prev => prev.map(a => 
      a.id === alertId ? { ...a, acknowledged: true } : a
    ));
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <div className="border-b border-red-900 bg-gray-900 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
          <h1 className="text-xl font-bold">Emergency Alert Console</h1>
          <span className="bg-red-900 text-red-200 text-xs px-2 py-1 rounded-full">
            {alerts.filter(a => !a.acknowledged).length} Active
          </span>
        </div>
        <BlockchainVerifier status="connected" nodeCount={8} />
      </div>

      <div className="grid grid-cols-12 gap-0 h-[calc(100vh-65px)]">
        {/* Alert List */}
        <div className="col-span-4 border-r border-gray-800 overflow-y-auto">
          {alerts.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-600">
              <span className="text-4xl mb-3">✅</span>
              <p>No active critical alerts</p>
            </div>
          ) : (
            alerts.map(alert => (
              <EmergencyAlertBanner
                key={alert.id}
                alert={alert}
                onClick={() => setSelectedPatient(alert.patientDid)}
                onAcknowledge={() => acknowledgeAlert(alert.id)}
                isSelected={selectedPatient === alert.patientDid}
              />
            ))
          )}
        </div>

        {/* Patient Detail Panel */}
        <div className="col-span-8 overflow-y-auto p-6">
          {selectedPatient ? (
            <CrossHospitalHistory patientDid={selectedPatient} />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-600">
              <span className="text-4xl mb-3">👆</span>
              <p>Select an alert to view cross-hospital patient history</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
```

### 14.2 Cross-Hospital History Component (Blockchain Data)

```tsx
// File: frontend/src/components/CrossHospitalHistory.tsx

import { useQuery } from '@tanstack/react-query';
import { Shield, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

interface CrossHospitalHistoryProps {
  patientDid: string;
}

export function CrossHospitalHistory({ patientDid }: CrossHospitalHistoryProps) {
  const { data, isLoading } = useQuery({
    queryKey: ['patient-history', patientDid],
    queryFn: async () => {
      const res = await fetch(`/api/v3/patients/${patientDid}/history`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      return res.json();
    }
  });

  if (isLoading) return (
    <div className="flex items-center gap-3 text-gray-400">
      <div className="animate-spin w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full" />
      Fetching blockchain records...
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Patient Header */}
      <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs text-gray-500 font-mono mb-1">Patient DID (Blockchain Identity)</p>
            <p className="font-mono text-sm text-blue-400">{patientDid}</p>
          </div>
          <div className="flex items-center gap-2 bg-green-900/30 border border-green-700 rounded-lg px-3 py-1.5">
            <Shield className="w-4 h-4 text-green-400" />
            <span className="text-green-400 text-sm font-medium">Blockchain Verified</span>
          </div>
        </div>
      </div>

      {/* Progression Summary */}
      {data?.progressionSummary && (
        <div className={`rounded-xl p-4 border ${
          data.progressionSummary.trend === 'WORSENING' 
            ? 'bg-red-900/20 border-red-800' 
            : 'bg-green-900/20 border-green-800'
        }`}>
          <h3 className="font-semibold mb-2 flex items-center gap-2">
            {data.progressionSummary.trend === 'WORSENING' 
              ? <AlertTriangle className="w-4 h-4 text-red-400" />
              : <CheckCircle className="w-4 h-4 text-green-400" />
            }
            Disease Progression Analysis
          </h3>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-gray-400">First Scan</p>
              <p className="font-medium">{new Date(data.progressionSummary.firstScanDate).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-gray-400">Fibrosis Change</p>
              <p className={`font-bold text-lg ${
                data.progressionSummary.fibrosisProgression.startsWith('+') ? 'text-red-400' : 'text-green-400'
              }`}>{data.progressionSummary.fibrosisProgression}</p>
            </div>
            <div>
              <p className="text-gray-400">Network Scans</p>
              <p className="font-medium">{data.totalScansNetworkWide} hospitals</p>
            </div>
          </div>
        </div>
      )}

      {/* Timeline — Your Hospital Scans */}
      <div>
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
          Your Hospital Scans ({data?.yourScans?.length})
        </h3>
        <div className="space-y-3">
          {data?.yourScans?.map((scan: any) => (
            <ScanCard key={scan._id} scan={scan} variant="full" />
          ))}
        </div>
      </div>

      {/* Timeline — Other Hospital Scans (Blockchain metadata only) */}
      {data?.otherHospitalScans?.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Other Hospital Records ({data.otherHospitalScans.length}) — Blockchain Verified
          </h3>
          <div className="space-y-3">
            {data.otherHospitalScans.map((scan: any) => (
              <ScanCard key={scan.scanId} scan={scan} variant="metadata-only" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
```

### 14.3 Blockchain Verifier Badge

```tsx
// File: frontend/src/components/BlockchainVerifier.tsx

import { Shield, ShieldCheck, ShieldX } from 'lucide-react';

interface BlockchainVerifierProps {
  reportHash?: string;
  storedHash?: string;
  txId?: string;
  status: 'connected' | 'verifying' | 'verified' | 'failed';
  nodeCount?: number;
}

export function BlockchainVerifier({ reportHash, storedHash, txId, status, nodeCount }: BlockchainVerifierProps) {
  const isVerified = status === 'verified' && reportHash === storedHash;

  return (
    <div className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm border ${
      status === 'connected' ? 'bg-blue-900/30 border-blue-700 text-blue-300' :
      isVerified ? 'bg-green-900/30 border-green-700 text-green-300' :
      status === 'failed' ? 'bg-red-900/30 border-red-700 text-red-300' :
      'bg-gray-800 border-gray-700 text-gray-400'
    }`}>
      {status === 'connected' && <ShieldCheck className="w-4 h-4" />}
      {isVerified && <ShieldCheck className="w-4 h-4" />}
      {status === 'failed' && <ShieldX className="w-4 h-4" />}
      {status === 'verifying' && <Shield className="w-4 h-4 animate-pulse" />}
      
      <span className="font-medium">
        {status === 'connected' && `Blockchain Live (${nodeCount} nodes)`}
        {isVerified && 'Report Integrity Verified'}
        {status === 'failed' && 'Integrity Check Failed'}
        {status === 'verifying' && 'Verifying on chain...'}
      </span>

      {txId && (
        <span className="font-mono text-xs opacity-60">
          {txId.slice(0, 8)}...
        </span>
      )}
    </div>
  );
}
```

---

## 15. Development Phases & Milestones

### Phase 0 — Foundation (Week 1–2) 🏗️
- [ ] MERN stack setup (React + Express + MongoDB + Node)
- [ ] Hyperledger Fabric local network (2 hospital nodes)
- [ ] Python AI microservice (port 8001)
- [ ] Basic Socket.io setup
- [ ] Docker Compose for full stack

### Phase 1 — Core AI (Week 3–4) 🤖
- [ ] DICOM upload endpoint (MongoDB GridFS)
- [ ] MedGemma 1.5 integration (local or HuggingFace API)
- [ ] Gemma 4 31B report generation (Ollama or Google AI Studio)
- [ ] MONAI liver segmentation
- [ ] Grad-CAM heatmap generation

### Phase 2 — Blockchain Core (Week 5–6) ⛓️
- [ ] Scan Registry chaincode deployed
- [ ] Consent Manager chaincode deployed
- [ ] `blockchainService.js` — Fabric SDK integration
- [ ] Report hash generation + on-chain registration
- [ ] Blockchain event listener (Socket.io bridge)

### Phase 3 — Cross-Hospital Network (Week 7–8) 🏥
- [ ] Patient DID creation + QR code generation
- [ ] Cross-hospital history endpoint
- [ ] IPFS encrypted report storage
- [ ] Hospital authorization flow (grant/revoke access)
- [ ] Emergency override (multi-sig)

### Phase 4 — Real-time Alerts (Week 9) 🔴
- [ ] Emergency alert smart contract
- [ ] Socket.io real-time broadcast
- [ ] Browser push notifications
- [ ] Twilio SMS alerts
- [ ] Emergency console UI

### Phase 5 — Frontend Polish (Week 10–11) 🎨
- [ ] Multi-hospital dashboard
- [ ] Cross-hospital timeline component
- [ ] Blockchain verifier badge
- [ ] Progression analysis charts
- [ ] PDF export with blockchain proof stamp

### Phase 6 — Hackathon Submission (Week 12) 🏆
- [ ] Full demo with 3-hospital network
- [ ] Video demonstration (3-minute demo video)
- [ ] Kaggle submission writeup
- [ ] GitHub public repo + Apache 2.0 license

---

## 16. Hackathon Submission Strategy

### Why v3.0 Wins Over v2.0

The Gemma 4 Good Hackathon judges look for **real-world impact + innovation + working prototype**. V3.0 adds:

1. **Blockchain = Systemic Impact** — not just one hospital improved, the entire healthcare network is transformed
2. **Emergency Action = Lives Saved** — smart contracts respond in seconds, not days
3. **Developing World Relevance** — tier-2/tier-3 Indian cities have fragmented hospital systems; blockchain bridges them
4. **Technical Ambition** — MERN + Hyperledger + Gemma 4 + MedGemma + IPFS + DID = unprecedented stack
5. **Open Source** — entire blockchain network code is Apache 2.0, any hospital can deploy

### Demo Script (3 minutes)

```
00:00 — Show patient scan at "Hospital A" (Agra)
00:20 — AI generates report in 60 seconds (Gemma 4 Thinking Mode visible)
00:40 — Report hash anchored on blockchain (show Hyperledger Explorer)
01:00 — LR-5 detected → Emergency Alert fires → Hospital B + C dashboards FLASH RED
01:20 — Switch to "Hospital B" (Delhi) — Emergency Console shows alert
01:35 — Hospital B scans patient QR code → FULL cross-hospital history appears (3 seconds)
01:50 — Show progression: F2 six months ago → F4 now → "WORSENING" badge
02:10 — Show blockchain audit trail: who accessed what, when, from where
02:30 — Blockchain verifier: report hash matches on-chain hash → VERIFIED ✅
02:50 — Closing: "Zero phone calls. Zero faxes. Any hospital. Any time. Lives saved."
```

---

## 17. Client Pitch Talking Points v3.0

### Opening Statement
> "HepatoScan AI v3.0 is not just a diagnostic tool — it's a medical intelligence network. When a patient walks into any hospital connected to our blockchain, doctors have their complete liver history in 3 seconds, not 3 days. And when the AI detects critical cancer risk, every authorized hospital in the network knows before the patient leaves the scanning room."

### On Blockchain (Handle the Skepticism)
> "We're not using blockchain for cryptocurrency or speculation. We're using it for exactly what it was designed for: a tamper-proof, shared record that all authorized parties can trust. Think of it as a universal fax machine that delivers instantly, can never be altered, and logs who read what, when."

### On Data Privacy
> "Patient data never leaves the hospital network. DICOM images stay on your servers. The blockchain only stores the report hash — a fingerprint that proves the report hasn't been tampered with. The actual report is encrypted with AES-256 and stored on IPFS, accessible only to hospitals the patient has authorized."

### On Emergency Situations
> "Under the current system, if a patient with a known LR-4 lesion collapses at a different hospital, the ER team starts from zero. Our smart contracts automatically alert every authorized hospital the moment a critical finding is detected. We turn a 72-hour data request into a 3-second blockchain lookup."

### On the Business Model
> "SaaS pricing: ₹200–500 per AI report. Blockchain network fee: ₹5,000/month per hospital node. For a 10-hospital network, that's ₹50,000/month in network fees alone, plus per-report revenue. Hospitals save on duplicate imaging, manual referrals, and malpractice risk — the ROI is immediate."

---

## Quick Reference: Key Model Strings

```python
# ─── Gemma 4 (HuggingFace) ───────────────────────────────────────────
GEMMA4_31B        = "google/gemma-4-31b-it"
GEMMA4_26B_MOE    = "google/gemma-4-26b-a4b-it"
GEMMA4_E4B        = "google/gemma-4-e4b-it"

# ─── MedGemma ────────────────────────────────────────────────────────
MEDGEMMA_4B   = "google/medgemma-1.5-4b-it"
MEDGEMMA_27B  = "google/medgemma-27b-it"
MEDSIGLLIP    = "google/medsigLIP"

# ─── Blockchain ──────────────────────────────────────────────────────
FABRIC_VERSION    = "2.5.x"
CHAINCODE_LANG    = "node"
CONSENSUS         = "RAFT orderer"
CHANNEL_NAME      = "hepatoscan-channel"
CHAINCODES        = ["scanRegistry", "consentManager", "emergencyAlert"]

# ─── MERN Stack ──────────────────────────────────────────────────────
NODE_VERSION      = "20 LTS"
MONGODB_VERSION   = "7.x"
EXPRESS_VERSION   = "4.x"
REACT_VERSION     = "18.3+"
SOCKET_IO         = "4.x"

# ─── Hackathon ───────────────────────────────────────────────────────
HACKATHON_URL     = "kaggle.com/competitions/gemma-4-good-hackathon"
PRIZE_POOL        = "$200,000 USD"
DEADLINE          = "May 18, 2026, 23:59 UTC"
MEDGEMMA_HACKATHON = "MedGemma Impact Challenge — $100K on Kaggle"
```

---

*Document Version: 3.0 — Updated April 16, 2026*
*HepatoScan AI | Powered by Gemma 4 + MedGemma 1.5 + Hyperledger Fabric | Apache 2.0*
*Gemma 4 Good Hackathon Submission | Deadline: May 18, 2026*
*New in v3.0: Blockchain Cross-Hospital Network + MERN Stack Architecture*
