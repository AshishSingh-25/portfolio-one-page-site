---
source: project-2-claim-denial-agent
title: Project - Healthcare Claim Denial Agent
verified_commit: 0406229854283c643acd81541fb72563512fd2a6
---

# Healthcare Claim Denial Agent

## What it is
Claim Resolve is a synthetic healthcare claim-denial review demo. It looks up a
sample denial code in a local JSON reference library, assembles an explanation,
and returns the reference entry's recommended action. Repository:
https://github.com/AshishSingh-25/healthcare-claim-denial-agent. The checked version
is a deterministic LangGraph workflow, not an active LLM inference pipeline.

## Live demo
The Healthcare Claim Denial Agent (Claim Resolve) is hosted at
https://claim-resolve-dun.vercel.app/. This is the claim project's public demo,
separate from the Stella portfolio and Rainbow Advertising.

## Stack and interfaces
The core uses Python, LangGraph, and a local JSON reference library. A styled
Streamlit app in app.py provides a claim form, seven sample denial reasons, a code
guide, and result cards. The repository also has a React/Vite frontend and a FastAPI
backend in frontend/ and backend/api.py. Both interfaces call the same LangGraph
workflow. The React frontend requests /api/denial-codes and /api/assess; the backend
also provides /api/health. The public demo is linked above; the implementation
description refers to the checked GitHub revision.

## Architecture and LLM status
The shared ClaimState passes through a fixed graph:
START -> lookup_denial -> analyze_claim -> generate_recommendation -> END.
lookup_denial_code normalizes whitespace and case and performs an exact dictionary
lookup in data/denial_codes.json. analyze_claim uses a deterministic string builder
called _fallback_analysis; generate_recommendation reads recommended_action from
the reference. There is no embedding search or LLM call in this active graph.
utils/llm.py contains a Groq/ChatGroq helper configured for llama-3.3-70b-versatile,
but the active workflow does not invoke it. No inference API key is required for
this deterministic baseline. A LangChain tool wrapper exists, but the fixed graph
calls the lookup function directly and does not choose tools autonomously.

## Reference coverage and honest limits
The local library has seven sample codes: CO-16, CO-18, CO-11, CO-22, CO-29, CO-50,
and CO-72. For example, the sample CO-16 entry concerns missing information and
CO-18 concerns duplicate claims. These are illustrative local entries, not a live
payer-policy integration or independently validated coding guidance. Results list
possible causes and reference actions; they do not determine which particular
claim field actually caused a real denial. No real patient integration, autonomous
tool selection, or multi-agent coordination is implemented.

## Unknown denial codes
At the core lookup/LangGraph layer, an unknown code such as CO-999 takes a safe
fallback: found=false, an explanation that reference information is missing, and
no generated recommendation. It does not invent a denial reason. The current
Streamlit and React forms offer only the seven known sample codes. The FastAPI
/api/assess endpoint rejects unknown codes during request validation with HTTP 422,
before invoking the graph. The core fallback and the API rejection are different
layers of the same application.

## Input validation and repository tests
FastAPI strips text whitespace, limits text/code lengths, forbids extra fields,
and requires a finite nonnegative claim amount capped at 10,000,000. It returns a
safe HTTP 503 if workflow execution fails. The repository's tests cover all seven
reference codes, normalized lookup, unknown and blank codes, escaped Streamlit
input, sample selection, API validation, and health. These are tests present in the
repository; this portfolio write-up does not claim they were executed here.
