import './App.css';
import { useForm, useFieldArray } from 'react-hook-form';

function App() {
  const { control, register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      name: '',
      email: '',
      bio: '',
      years: '',
      company: [{ name: '' }],
    }
  });

  const { fields, append } = useFieldArray({
    control,
    name: 'company'
  });

  const onSubmit = (data) => {
    console.log(data); // Handle form data submission
    // Reset the form after successful submission
    reset({
      name: '',
      email: '',
      bio: '',
      years: '',
      company: [{ name: '' }], // Reset the company array with initial or empty values
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>My Details</h1>
        <div className="formgrid">
        <div className='bio'>
          <label htmlFor="name">Name <span>*</span>: <br></br>
            <input type="text" id='name' name='name' {...register('name', { required: true })} className={errors.name ? 'error' : ''} />
          </label>
        </div>

        <div className='bio'>
          <label htmlFor="email">Email <span>*</span>: <br></br>
            <input type="text" id='email' name='email' {...register('email', { required: true, pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/ })} className={errors.email ? 'error' : ''} />
          </label>
        </div>

        <div className='bio'>
          <label htmlFor="bio">Bio <span>*</span>: <br></br>
            <textarea id='bio' name='bio' {...register('bio', { required: true })} className={errors.bio ? 'error' : ''} />
          </label>
        </div>

        <div className='bio'>
          <label htmlFor="years">Years of Experience <span>*</span>: <br></br>
            <input type="number" id='years' name='years' {...register('years', { required: true })} className={errors.years ? 'error' : ''} />
          </label>
        </div>
        

        {/* Dynamic Company Fields */}
        {fields.map((field, index) => (
          <div key={field.id} className='bio'>
            <label htmlFor={`company-${index}`}>Company or Companies worked at <span>*</span> <br></br> {index + 1}:
              <input
                type="text"
                id={`company-${index}`}
                name={`company[${index}].name`}
                className={errors.company?.[index]?.name ? 'error' : ''}
                {...register(`company.${index}.name`, { required: true })}
                defaultValue={field.name}
              />
            </label>
            <button type='button' onClick={() => append({ name: '' })} className='add'>ADD</button>
          </div>
        ))}
        </div>


        <button type='submit' className='submit'>Submit</button>
      </form>
    </>
  )
}

export default App;