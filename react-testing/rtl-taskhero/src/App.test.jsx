import React from 'react'
import {fireEvent, render, screen, waitFor, waitForElementToBeRemoved} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {server} from './mocks/server'
import {rest} from 'msw'
import App from './App'
import {GlobalWrapper} from './testUtils'
import {getApiUrl} from './components/api'
import {getTasksError, singleTask, updateTaskError} from './mocks/handlers'

const waitForLoading = () => {
    return waitForElementToBeRemoved(() => screen.getByRole('alert', {name: 'loading'}))
}

const withWrapper = {wrapper: GlobalWrapper}

// it('shows the loading spinner while data is loading', async () => {
//     render(<App />, withWrapper)
//     expect(screen.getByRole('alert', {name: /loading/i}))
// })

// it('shows an alert if there are no tasks', async () => {
//     render(<App />, withWrapper)
//     await waitForLoading()

//     expect(screen.getByRole('heading', {name: /No tasks yet/i}))
// })

// it('shows an error message if the API returns an error', async () => {
//     server.use(getTasksError)

//     render(<App />, withWrapper)
//     await waitForLoading()

//     expect(screen.getByRole('heading', {name: /error/i}))
// })

// it('inserts a new task', async () => {
//     render(<App />, withWrapper)
//     await waitForLoading()

//     const insertElement = screen.getByRole('textbox', {name: /insert/i})

//     userEvent.type(insertElement, 'Hello')
//     fireEvent.keyUp(insertElement, {keyCode: 13})

//     expect(insertElement).toBeDisabled()
//     await waitFor(() => expect(insertElement).not.toBeDisabled())

//     expect(insertElement).toHaveValue('')
//     expect(screen.getByTestId(/task-/)).toHaveTextContent(/Hello/i)
// })

// it('displays an error message if the API fails', async () => {
//     server.use(updateTaskError)

//     render(<App />, withWrapper)
//     await waitForLoading()

//     const insertElement = screen.getByRole('textbox', {name: /insert/i})
//     fireEvent.keyUp(insertElement, {keyCode: 13})

//     expect(insertElement).toBeDisabled()
//     await waitFor(() => expect(insertElement).not.toBeDisabled())

//     expect(screen.getByRole('alert')).toHaveTextContent(/missing label/i)
// })

// it('toggles the task completed state', async () => {
//     server.use(singleTask)

//     render(<App />, withWrapper)
//     await waitForLoading()

//     userEvent.click(screen.getByRole('checkbox', {name: /mark as completed/i}))
//     expect(screen.getByRole('checkbox')).toBeDisabled()
//     await waitFor(() => expect(screen.getByRole('checkbox')).toBeChecked())

//     userEvent.click(screen.getByRole('checkbox', {name: /mark as uncompleted/i}))
//     expect(screen.getByRole('checkbox')).toBeDisabled()
//     await waitFor(() => expect(screen.getByRole('checkbox')).not.toBeChecked())
// })

// it('handles toggling the completed state failing', async () => {
//     server.use(singleTask)
//     server.use(updateTaskError)

//     render(<App />, withWrapper)
//     await waitForLoading()

//     userEvent.click(screen.getByRole('checkbox', {name: /mark as completed/i}))

//     await waitFor(() => {
//         expect(screen.getByRole('alert')).toHaveTextContent(/something went wrong/i)
//     })
// })

it('shows the loading spinner while data is loading', async () => {})
it('shows an alert if there are no tasks', async () => {})
it('shows an error message if the API returns an error', async () => {})
it('inserts a new task', async () => {})
it('displays an error message if the API fails', async () => {})
it('toggles the task completed state', async () => {})
it('handles toggling the completed state failing', async () => {})
