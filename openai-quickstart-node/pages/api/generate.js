import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  const person = req.body.person || '';
  if (person.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid person",
      }
    });
    return;
  }
  const hobbie = req.body.hobbie || '';
  if (hobbie.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid hobbie",
      }
    });
    return;
  }
  const age = req.body.age || '';
  if (age.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid age",
      }
    });
    return;
  }
  const gender = req.body.gender || '';
  if (gender.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid gender",
      }
    });
    return;
  }
  const budget = req.body.budget || '';
  if (budget.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid budget",
      }
    });
    return;
  }
  const need = req.body.need || '';
  if (need.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid need",
      }
    });
    return;
  }
  const occasion = req.body.occasion || '';
  if (occasion.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid occasion",
      }
    });
    return;
  }
  const color = req.body.color || '';
  if (color.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid color",
      }
    });
    return;
  }
  const brand = req.body.brand || '';
  if (brand.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid brand",
      }
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(person, hobbie, age, gender, budget, need, occasion, color, brand),
      temperature: 0.8,
      max_tokens: 256
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}

function generatePrompt(person, hobbie, age, gender, budget, need, occasion, color, brand) {
  const capitalizedPerson =
    person[0].toUpperCase() + person.slice(1).toLowerCase();
  return `Give me 10 creative gift ideas for a person with the following parameters based off of the specified importance 1-10:
  
  - Their relationship to the person is ${capitalizedPerson} (importance 2)
  - Their favorite hobbies are ${hobbie} (importance 10)
  - Their age is ${age} (importance 2)
  - Their gender is ${gender} (importance 2)
  - The gifts should be within 20$ of ${budget} (importance 9)
  - If they have a certain need, it would be ${need} (importance 3)
  - The special occasion is ${occasion} (importance 6)
  - The associated color of the occasion or their favorite color is ${color} (importance 1)
  - Their favorite brand is ${brand} (importance 5)
  
  If any of the above parameters have "None" in them, ignore that parameter.  Also don't include the specific parameters in the response. Respond with short and concise, but specific answers. Give the different ideas for the different hobbies`;
}
