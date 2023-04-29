import { cleanup, fireEvent, render } from '@testing-library/vue'
import AppButton from './AppButton.vue'

describe('AppButton click events', () => {
  it('AppButton emits component:click', async () => {
    const button = render(AppButton)
    const clickable = await button.findByRole('button')
    await fireEvent.click(clickable)
    expect(button.emitted('component:click')).toBeTruthy()
    cleanup()
  })

  it('AppButton doesnt emit component:click when disabled', async () => {
    const button = render(AppButton, {
      props: {
        isDisabled: true,
      },
    })
    const clickable = await button.findByRole('button')
    await fireEvent.click(clickable)
    expect(button.emitted('component:click')).toBeFalsy()
    cleanup()
  })

  it('AppButton doesnt emit component:click when loading', async () => {
    const button = render(AppButton, {
      props: {
        isLoading: true,
      },
    })
    const clickable = await button.findByRole('button')
    await fireEvent.click(clickable)

    expect(button.emitted('component:click')).toBeFalsy()
    cleanup()
  })
})
