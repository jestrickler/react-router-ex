import { Form, redirect, useLoaderData, useNavigate } from 'react-router-dom'
import { updateContact } from '../contacts'
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

  return (
    <Form method='post' id='contact-form'>
      <label>
        <span>First Name</span>
        <input
          name='first'
          required
          minLength={2}
          maxLength={20}
          aria-label='First name'
          placeholder='First'
          defaultValue={contact.first}
        />
      </label>
      <label>
        <span>Last Name</span>
        <input
          name='last'
          required
          minLength={2}
          maxLength={20}
          aria-label='Last name'
          placeholder='Last'
          defaultValue={contact.last}
        />
      </label>
      <label>
        <span>Twitter</span>
        <input
          name='twitter'
          pattern={/(?<=^|(?<=[^a-zA-Z0-9-_.]))@([A-Za-z]+[A-Za-z0-9-_]+)/g}
          aria-label='twitter handle'
          placeholder='@jack'
          defaultValue={contact.twitter}
        />
      </label>
      <label>
        <span>Avatar URL</span>
        <input
          name='avatar'
          pattern={/(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))/i}
          placeholder='https://example.com/avatar.jpg'
          aria-label='Avatar URL'
          defaultValue={contact.avatar}
        />
      </label>
      <label>
        <span>Notes</span>
        <textarea name='notes' defaultValue={contact.notes} rows={6} />
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
