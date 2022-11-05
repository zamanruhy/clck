import { createSignal } from 'solid-js'
import ThemeSwitcher from '@/components/lib/ThemeSwitcher'
import RadioGroup from '@/components/lib/RadioGroup'
import Radio from '@/components/lib/Radio'
import Switch from '@/components/lib/Switch'
import Checkbox from '@/components/lib/Checkbox'
import ToTop from '@/components/lib/ToTop'
import Button from '@/components/lib/Button'
import Hamburger from '@/components/lib/Hamburger'
import Spinner from '@/components/lib/Spinner'
import Input from '@/components/lib/Input'
import PasswordInput from '@/components/lib/PasswordInput'
import MaskedInput from '@/components/lib/MaskedInput'

export default function About() {
  return (
    <>
      <div class="container">
        <div class="-mx-4 mb-4 rounded px-4 pt-4 pb-6 transition-colors dark:(bg-slate-800 text-slate-100)">
          <h1 class="mb-3 text-xl">Theme Switcher</h1>
          <ThemeSwitcher />
        </div>
        <RadioGroupSection />
        <SwitchSection />
        <CheckboxSection />
        <ButtonSection />
        <HamburgerSection />
        <SpinnerSection />
        <InputSection />

        <ToTop />
      </div>
    </>
  )
}

function RadioGroupSection() {
  const [radioValue, setRadioValue] = createSignal('three')
  return (
    <div class="mb-10">
      <h1 class="mb-3 text-xl">RadioGroup</h1>
      <RadioGroup
        class="flex flex-wrap gap-4"
        name="radio-group"
        aria-label="Radio Group"
        value={radioValue()}
        onChange={(e) => setRadioValue(e.target.value)}
      >
        <Radio label="Default" value="one" />
        <Radio label="Another" value="two" />
        <Radio label="Disabled" value="three" disabled />
      </RadioGroup>
    </div>
  )
}

function SwitchSection() {
  const [switchChecked, setSwitchChecked] = createSignal(false)
  return (
    <div class="mb-10">
      <h1 class="mb-3 text-xl">Switch</h1>
      <div class="flex flex-wrap gap-4">
        <Switch
          checked={switchChecked()}
          onChange={(e) => setSwitchChecked(e.target.checked)}
          label="Default"
        />
        <Switch
          checked={switchChecked()}
          onChange={(e) => setSwitchChecked(e.target.checked)}
          label="Disabled"
          disabled
        />
      </div>
    </div>
  )
}

function CheckboxSection() {
  const [checked, setChecked] = createSignal(false)
  const [indeterminate, setIndeterminate] = createSignal(true)
  // const [temp, setTemp] = createSignal(false)
  // const [radioValue, setRadioValue] = createSignal('three')
  return (
    <div class="mb-10">
      <h1 class="mb-3 text-xl">Checkbox</h1>
      {/* <Checkbox
        checked
        onChange={(e) => setTemp(e.target.checked)}
        // checked={true}
        name="uncontrolled"
        label="Uncontrolled"
      />
      <Radio label="Another" name="some" value="two" />
      <RadioGroup
        class="flex flex-wrap gap-4"
        // name="radio-group-blah"
        aria-label="Radio Group"
        name={checked() + ''}
        value={radioValue()}
      >
        <Radio label="Default" value="one" />
        <Radio label="Another" value="two" />
        <Radio label="Disabled" value="three" />
      </RadioGroup>
      <Switch checked label="Uncontrolled" /> */}

      <div class="flex flex-wrap gap-4">
        <Checkbox
          checked={checked()}
          onChange={(e) => setChecked(e.target.checked)}
          label="Default"
        />
        <Checkbox
          checked={checked()}
          onChange={(e) => {
            setChecked(e.target.checked)
            setIndeterminate(e.target.indeterminate)
          }}
          label="Indeterminate"
          indeterminate={indeterminate()}
        />
        <Checkbox
          checked={checked()}
          onChange={(e) => setChecked(e.target.checked)}
          label="Disabled&Indeterminate"
          disabled
          indeterminate={indeterminate()}
        />
        <Checkbox
          checked={checked()}
          onChange={(e) => setChecked(e.target.checked)}
          label="Disabled"
          disabled
        />
      </div>
    </div>
  )
}

function ButtonSection() {
  return (
    <div class="mb-10">
      <h1 class="mb-3 text-xl">Switch</h1>
      <div class="flex flex-wrap gap-3">
        <Button type="button" variant="primary" size="md">
          Button
        </Button>
        <Button as="a" href="#" variant="primary" size="md" disabled>
          Button
        </Button>
        <Button as="a" href="#" variant="primary" size="md" loading>
          Button
        </Button>
        <Button type="button" variant="primary" size="md">
          <svg
            class="mr-1.5 h-4 fill-current"
            aria-hidden="true"
            viewBox="0 0 17 13"
          >
            <path d="M13.8 7.29v4.73c0 .17-.06.32-.19.44a.58.58 0 0 1-.45.19H9.33V8.86H6.77v3.79H2.94a.58.58 0 0 1-.45-.19.58.58 0 0 1-.19-.44V7.26l.01-.03 5.74-4.68 5.74 4.68.01.06zm2.23-.68-.62.73a.35.35 0 0 1-.21.1h-.03a.33.33 0 0 1-.21-.06L8.05 1.69 1.14 7.38a.36.36 0 0 1-.24.06.35.35 0 0 1-.21-.1l-.62-.73A.34.34 0 0 1 0 6.37a.3.3 0 0 1 .11-.21L7.29.26C7.5.09 7.76 0 8.05 0c.29 0 .55.09.76.26l2.44 2.01V.35c0-.1.03-.17.09-.23a.3.3 0 0 1 .23-.09h1.91c.1 0 .17.03.23.09a.3.3 0 0 1 .09.23v4.02l2.19 1.79c.07.05.1.13.11.21a.34.34 0 0 1-.07.24z"></path>
          </svg>
          Button
        </Button>
      </div>
    </div>
  )
}

function HamburgerSection() {
  const [active, setActive] = createSignal(false)
  return (
    <div class="mb-10">
      <h1 class="mb-3 text-xl">Hamburger</h1>
      <Hamburger active={active()} onClick={() => setActive(!active())} />
    </div>
  )
}

function SpinnerSection() {
  return (
    <div class="mb-10">
      <h1 class="mb-3 text-xl">Spinner</h1>
      <Spinner size={50} thickness={3} />
    </div>
  )
}

function InputSection() {
  const [mInputValue, setMInputValue] = createSignal('+7(523) 4')
  const [maskPattern, setMaskPattern] = createSignal('{+7}(#00) 000-0000')
  return (
    <div class="mb-10">
      <h1 class="mb-3 text-xl">Input</h1>
      <div class="grid items-start gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <Input placeholder="Some placeholder" />

        <div class="flex">
          <div class="flex items-center rounded-l border border-r-0 border-slate-300 bg-slate-100 px-4">
            @
          </div>

          <Input
            class="rounded-l-none"
            type="email"
            placeholder="Enter email"
          />
        </div>

        <div class="flex">
          <Input
            class="-mr-px rounded-r-none border-r-transparent bg-clip-padding focus:z-10"
            type="text"
            placeholder="Close to button"
          />
          <Button
            class="rounded-l-none"
            type="button"
            variant="primary"
            size="md"
          >
            Send
          </Button>
        </div>

        <div class="relative flex">
          <div class="pointer-events-none absolute inset-y-0 left-0 grid w-10 place-content-center">
            <svg viewBox="0 0 14 14" class="ml-0.5 h-4 fill-slate-300">
              <path d="M2.2.01a.49.49 0 0 0-.28.02C.87.43.22 1.93.06 2.96c-.49 3.33 2.15 6.21 4.57 8.1 2.15 1.7 6.27 4.46 8.71 1.79.31-.33.68-.81.66-1.3-.06-.81-.81-1.4-1.4-1.84-.44-.33-1.37-1.24-1.95-1.22-.52.02-.85.57-1.18.9l-.58.58c-.1.1-1.34-.72-1.47-.82a9.88 9.88 0 0 1-2.56-2.42c-.1-.13-.9-1.32-.81-1.41 0 0 .67-.74.87-1.03.4-.62.71-1.1.25-1.84a4.33 4.33 0 0 0-.62-.71c-.4-.4-.81-.8-1.28-1.13a2.7 2.7 0 0 0-1.06-.6Z" />
            </svg>
          </div>
          <Input class="pl-10 pr-10" type="tel" placeholder="Phone number" />
          <div class="pointer-events-none absolute inset-y-0 right-0 flex w-10 items-center justify-center">
            <svg viewBox="0 0 14 14" class="mr-0.5 h-4 fill-green-600">
              <path d="M5.5 12 14 3.5 12.5 2l-7 7-4-4L0 6.5z" />
            </svg>
          </div>
        </div>

        <PasswordInput placeholder="Enter password" value="Secret" />

        <div class="relative">
          <label
            for="with-label"
            class="mb-2 block text-sm font-bold text-gray-700"
          >
            With label
          </label>
          <Input
            value={mInputValue()}
            onInput={(e) => setMInputValue(e.target.value)}
            id="with-label"
            placeholder="With label and hint"
            aria-describedby="with-hint"
          />
          <div class="mt-1.5 text-(xs slate-400)" id="with-hint">
            Some useful hint under input
          </div>
        </div>

        <div class="relative">
          <Input
            value={maskPattern()}
            onInput={(e) => setMaskPattern(e.target.value)}
            invalid
            placeholder="With error"
            aria-describedby="with-error"
          />
          <div class="mt-1.5 text-(12px red-600)" id="with-error">
            Please select your currency
          </div>
        </div>

        <MaskedInput
          value={mInputValue()}
          onInput={(e) => setMInputValue(e.target.value)}
          mask={maskPattern()}
          definitions={{ '#': /[5-8]/ }}
          // unmask={checked()}
          name="masked-input"
          placeholder="Masked input"
        />
        {mInputValue()}
      </div>
    </div>
  )
}
