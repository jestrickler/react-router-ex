import {
  Form,
  redirect,
  useLoaderData,
  useNavigate,
  useSubmit
} from 'react-router-dom'
import { updateContact } from '../contacts'
import { useForm } from 'react-hook-form'

// eslint-disable-next-line react-refresh/only-export-components
export async function action({ request, params }) {
  const formData = await request.formData()
  console.log('ACTION', formData)
  const updates = Object.fromEntries(formData)
  await updateContact(params.contactId, updates)
  return redirect(`/contacts/${params.contactId}`)
}

export default function EditContact() {
  const { contact } = useLoaderData()
  const navigate = useNavigate()
  const {
    formState: { errors },
    handleSubmit,
    register
  } = useForm({ mode: 'onBlur' })
  const submit = useSubmit()
  console.log('ERRORS', errors)

  return (
    <Form
      // method='post'
      id='contact-form'
      onSubmit={(event) => {
        const target = event.currentTarget
        handleSubmit(() => {
          submit(target, { method: 'post' })
        })(event)
      }}
    >
      <label>
        <span>First Name</span>
        <input
          {...register('first', {
            required: 'First name is required',
            minLength: {
              value: 2,
              message: 'First name must be at least 2 characters'
            },
            maxLength: {
              value: 20,
              message: 'First name can be at most 20 characters'
            }
          })}
          aria-label='First name'
          placeholder='First'
          defaultValue={contact.first}
          aria-invalid={errors.first ? 'true' : 'false'}
        />
        {errors.first && <span role='alert'>{errors.first.message}</span>}
      </label>
      <label>
        <span>Last Name</span>
        <input
          {...register('last', {
            required: 'Last name is required',
            minLength: {
              value: 2,
              message: 'Last name must be at least 2 characters'
            },
            maxLength: {
              value: 20,
              message: 'Last name can be at most 20 characters'
            }
          })}
          aria-label='Last name'
          placeholder='Last'
          defaultValue={contact.last}
          aria-invalid={errors.last ? 'true' : 'false'}
        />
        {errors.last && <span role='alert'>{errors.last.message}</span>}
      </label>
      <label>
        <span>Twitter</span>
        <input
          {...register('twitter', {
            pattern: {
              value: /(?<=^|(?<=[^a-zA-Z0-9-_.]))@([A-Za-z]+[A-Za-z0-9-_]+)/g,
              message: 'Must be a valid twitter handle'
            }
          })}
          aria-label='twitter handle'
          placeholder='@jack'
          defaultValue={contact.twitter}
          aria-invalid={errors.twitter ? 'true' : 'false'}
        />
        {errors.twitter && <span role='alert'>{errors.twitter.message}</span>}
      </label>
      <label>
        <span>Avatar URL</span>
        <input
          {...register('avatar', {
            pattern: {
              value: /(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))/i,
              message: 'Must be a valid image url'
            }
          })}
          placeholder='https://example.com/avatar.jpg'
          aria-label='Avatar URL'
          name='avatar'
          defaultValue={contact.avatar}
          aria-invalid={errors.avatar ? 'true' : 'false'}
        />
        {errors.avatar && <span role='alert'>{errors.avatar.message}</span>}
      </label>
      <label>
        <span>Notes</span>
        <textarea
          {...register('notes')}
          name='notes'
          defaultValue={contact.notes}
          rows={6}
          aria-invalid={errors.notes ? 'true' : 'false'}
        />
        {errors.notes && <span role='alert'>{errors.notes.message}</span>}
      </label>
      <p>
        <button type='submit'>Save</button>
        <button
          type='button'
          onClick={() => {
            navigate(-1)
          }}
        >
          Cancel
        </button>
      </p>
    </Form>
  )
}
