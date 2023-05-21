---
title: Key Points when Learning Large Language Models (LLMs)
description: Key terms, instructions, and any other information that will help
  me understand Large Language Models (LLMs) better.
date: 2023-05-21T16:11:08.123Z
tags:
  - programming
  - LLM
  - AI
---
# Introduction to Building Systems with Large Language Models (LLMs)

In the era of artificial intelligence, Large Language Models (LLMs) have emerged as powerful tools for understanding and generating human-like text. These models, trained on vast amounts of data, can be utilized in a variety of applications, from chatbots to content generation and more. This guide provides a comprehensive overview of the key components involved in implementing LLMs, including the role of users, the function of chatbots, the importance of prompts, and the process of building your own system. Whether you're a seasoned AI practitioner or a beginner in the field, this guide offers valuable insights into the world of LLMs.

* **Paper about LLMs**: [Attention is All You Need](https://bytez.com/read/arxiv/1706.03762?hl=en)

## Flow

* **Users**: Humans interacting with the system
* **Chatbot**:

  * **Model**: Large Language Models (LLMs) serving as AI translators

    * Examples: Chat GPT4.0, Chat GPT 3.5-turbo, Davinci Code, etc. (see [ChatGPT Models](https://platform.openai.com/docs/models/overview))
  * **Prompt**: Set of syntax/instructions that guide the model's responses

    * We can use existing prompts or create our own.
    * Resource: [Awesome ChatGPT Prompts](https://github.com/f/awesome-chatgpt-prompts)
  * **Chain**: The sequence of interactions

    * Prompt
    * Previous conversations, if any
    * User queries
    * Data retrieval from the database (the source of truth)
    * Result: Detailed explanations or summaries
* **Database Index**: Stores indexed data used by the Chatbot (the source of truth)

  * Examples: Supabase, Pinecone, AWS, Azure, etc.
* **Indexer**: Tools for gathering/crawling knowledge

  * We can build our own knowledge crawling or data storing system

## The most important aspect: Building our own system

* Choose a library to load the model or connect to an existing model
* Build the interaction interface: React, Vue, WhatsApp, Telegram, etc.

## Library for LLM

* **LangChain**: [Documentation](https://python.langchain.com/en/latest/modules/chains/how_to_guides.html)

## Related stuff

* Overview of ChatGPT / AI models: [YouTube Video](https://www.youtube.com/watch?v=WVct5y3hBEg)
* Prompts Generator: [ChatGPT Prompts Generator](https://huggingface.co/spaces/merve/ChatGPT-prompt-generator)
* JavaScrip LLMs library: [Javacript LangChain](https://js.langchain.com/docs/)
* Python LLMs library: [LangChain and ChatGPT Tutorial](https://blog.futuresmart.ai/building-chatbot-using-langchain-and-chatgpt)
* Rust LLMs library: [Rust LangChain](https://docs.rs/langchain/latest/langchain/)
* Go LLMs library: [Go LangChain](hhttps://github.com/tmc/langchaingo)
* PHP LLMs library: [PHP LangChain](https://github.com/kambo-1st/langchain-php)

## Examples

* **Chatbot using JS: [Pinecone Tutorial](https://www.pinecone.io/learn/javascript-chatbot/)**
* **Chatbot using Python: [LangChain and ChatGPT Tutorial](https://blog.futuresmart.ai/building-chatbot-using-langchain-and-chatgpt)**
