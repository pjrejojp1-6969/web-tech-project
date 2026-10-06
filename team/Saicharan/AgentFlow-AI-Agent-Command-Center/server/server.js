import express from 'express';
import multer from 'multer';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import { PDFParse } from 'pdf-parse';
import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

dotenv.config({path:path.join(process.cwd(),'server','.env')});
const app=express();
const upload=multer({storage:multer.memoryStorage(),limits:{fileSize:10*1024*1024}});
const PORT=process.env.PORT||3000;
const client=process.env.OPENAI_API_KEY?new OpenAI({apiKey:process.env.OPENAI_API_KEY}):null;
const docs=new Map();
app.use(express.json({limit:'2mb'}));
app.use(express.static(process.cwd()));

function demoReply(agent,text){
 const lower=text.toLowerCase();
 if(lower.includes('recursion')) return 'Recursion is when a function calls itself to solve a smaller version of the same problem. A recursive solution normally has two parts: a base case that stops the recursion, and a recursive case that reduces the problem. Example: factorial(4) = 4 × factorial(3) = 4 × 3 × 2 × 1 = 24.';
 if(lower.includes('study plan')) return 'Here is a simple study plan: 1) Spend 25 minutes learning one concept. 2) Spend 20 minutes solving two examples. 3) Spend 10 minutes explaining the concept without notes. 4) Spend 5 minutes writing what you still do not understand. Repeat this cycle for the next topic.';
 return `I’m running in demo mode right now, so I can demonstrate the AgentFlow workflow but I cannot call a live AI model yet. Your ${agent.name} received: “${text}”. Add OPENAI_API_KEY to server/.env and restart the server to get real AI responses.`;
}
app.get('/api/health',(req,res)=>res.json({ok:true,aiConfigured:Boolean(client)}));
app.post('/api/chat',async(req,res)=>{
 try{const {agent,input,model='gpt-6-luna'}=req.body;if(!agent||!Array.isArray(input))return res.status(400).json({error:'Invalid chat request'});
 if(!client)return res.json({reply:demoReply(agent,input.at(-1)?.content||''),demo:true});
 const response=await client.responses.create({model,instructions:agent.system||'You are a helpful AI assistant.',input:input.slice(-20)});
 res.json({reply:response.output_text||'The model returned no text.'});
 }catch(e){res.status(500).json({error:e?.message||'AI request failed'})}
});
app.post('/api/upload',upload.single('pdf'),async(req,res)=>{
 try{if(!req.file)return res.status(400).json({error:'No PDF uploaded'});const parser=new PDFParse({data:req.file.buffer});const result=await parser.getText();await parser.destroy();const id=crypto.randomUUID();docs.set(id,{name:req.file.originalname,text:result.text.slice(0,120000)});res.json({id,name:req.file.originalname,pages:result.total});}catch(e){res.status(500).json({error:'Could not read PDF: '+e.message})}
});
app.post('/api/document-action',async(req,res)=>{
 try{const {documentId,mode}=req.body;const doc=docs.get(documentId);if(!doc)return res.status(404).json({error:'Document not found. Upload it again after restarting the server.'});
 const prompts={summary:'Summarize this document in clear bullet points. Highlight the main ideas and important terms.',questions:'Create 10 useful questions a student could ask about this document, followed by concise answers based only on the document.',mcq:'Create 8 multiple-choice questions from this document. Give four options and clearly mark the correct answer.',keypoints:'Extract the most important key points from this document. Organize them under short headings.'};
 if(!client)return res.json({result:`DEMO MODE\n\n${prompts[mode]}\n\nDocument: ${doc.name}\n\nThe PDF was successfully extracted by the backend. Add OPENAI_API_KEY to server/.env to generate the real AI result.\n\nExtracted text preview:\n${doc.text.slice(0,1800)}`,demo:true});
 const response=await client.responses.create({model:process.env.OPENAI_MODEL||'gpt-6-luna',instructions:'You are a careful document analysis assistant. Use only the supplied document text. Do not invent facts.',input:`Task: ${prompts[mode]}\n\nDOCUMENT TEXT:\n${doc.text}`});
 res.json({result:response.output_text||'No result generated.'});
 }catch(e){res.status(500).json({error:e?.message||'Document analysis failed'})}
});
app.listen(PORT,()=>console.log(`AgentFlow running at http://localhost:${PORT}`));
