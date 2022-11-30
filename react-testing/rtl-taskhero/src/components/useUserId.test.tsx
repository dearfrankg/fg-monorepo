import {renderHook} from '@testing-library/react-hooks'
import {UserIdProvider, useUserId} from './useUserId'

it.skip('generates a new userId if one does not exist', () => {
    const {result} = renderHook(() => useUserId(), {wrapper: UserIdProvider})
    expect(typeof result.current).toEqual('string')
})

it.skip('persists a new userId if one does not exist', async () => {
    renderHook(() => useUserId(), {wrapper: UserIdProvider})
    expect(typeof localStorage.getItem('userId')).toEqual('string')
})

it.skip('returns an existing userId', async () => {
    localStorage.setItem('userId', 'test-id')

    const {result} = renderHook(() => useUserId(), {wrapper: UserIdProvider})
    expect(result.current).toEqual('test-id')
})

it.skip('two instances return the same userId', async () => {
    localStorage.setItem('userId', 'test-id')

    const {result: result1} = renderHook(() => useUserId(), {wrapper: UserIdProvider})
    const {result: result2} = renderHook(() => useUserId(), {wrapper: UserIdProvider})

    expect(result1.current).toEqual(result2.current)
})
