"use client";

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Form from '@components/Form';


const CreatePrompt = () => {

    const router = useRouter();
    const { data: session } = useSession();
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: '',
        tag: '',
    });
    const createPrompt = async (e) => {
        e.preventDefault();//no browser refresh
        setSubmitting(true);
        try{
            const response = await fetch('/api/prompt/new', {
                method: 'POST',
                body: JSON.stringify({
                    prompt: post.prompt,
                    userId: session?.user.id,
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
            type="Create" //type of form
            post={post} // actual post
            setPost={setPost}
            submitting={submitting}
            handleSubmit={createPrompt}
        />
    )
}

export default CreatePrompt