import { Schema, model, models} from 'mongoose';

const PromptSchema = new Schema({
    creator:{
        type: Schema.Types.ObjectId,
        ref: 'User',//used to create a reference to another model. This allows you to establish relationships between different collections in MongoDB. This allows you to populate the user field with the actual user document when querying the Prompt collection.
    },
    prompt:{
        type: String,
        required: [true, 'Prompt is required!'],
    },
    tag:{
        type: String,
        required: [true, 'Tag is required!'],
    },
});

const Prompt = models.Prompt || model("Prompt", PromptSchema);

export default Prompt;