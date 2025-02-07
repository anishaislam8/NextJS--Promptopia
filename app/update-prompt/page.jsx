"use client";

import { useEffect, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';


import Form from '@components/Form';


const EditPrompt = () => {

    const router = useRouter();

    const searchParams = useSearchParams();
    const promptId = searchParams.get('id');

    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: '',
        tag: '',
    });

    useEffect(() => {
        const getPromptDetails = async () => {
            const response = await fetch(`api/prompt/${promptId}`);
            const data = await response.json();

            setPost({
                prompt: data.prompt,
                tag: data.tag,
            })
        }

        if (promptId) getPromptDetails()

    }, [promptId])
    
    const updatePrompt = async (e) => {
        e.preventDefault();//no browser refresh
        setSubmitting(true);

        if (!promptId) return alert("Prompt ID not found!");
        try{
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag,
                }),
            });

            if (response.ok){
                router.push('/'); // redirect to home page
            }
        } catch (error){
            console.error(error);
        } finally{
            setSubmitting(false);
        }
    }
  
    return (
        <Form 
            type="Edit" //type of form
            post={post} // actual post
            setPost={setPost}
            submitting={submitting}
            handleSubmit={updatePrompt}
        />
    )
}

export default EditPrompt