"use client";

import { Button, Checkbox, Radio, TextField } from "@tritonse/tse-constellation";

import TextArea from "../../components/TextArea";

export default function GeneralComponentTest() {
  return (
    <div>
      <h1 style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>Buttons</h1>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
        {/* Default button */}
        <div
          style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px" }}
        >
          <h2>Default:</h2>
          <span>Default</span>
          <Button>Button</Button>

          <span>Deactivated</span>
          <Button disabled={true}>Button</Button>
        </div>

        {/* Default small */}
        <div
          style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px" }}
        >
          <h2>Default Small:</h2>
          <span>Default</span>
          <Button small={true}>Button</Button>
          <span>Deactivated</span>
          <Button small={true} disabled={true}>
            Button
          </Button>
        </div>

        {/* Secondary */}
        <div
          style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px" }}
        >
          <h2>Secondary:</h2>
          <span>Default</span>
          <Button variant={"secondary"} className="!text-black !border-black">
            Button
          </Button>
          <span>Deactivated</span>
          <Button variant={"secondary"} className="!text-black !border-black" disabled={true}>
            Button
          </Button>
        </div>

        {/* Secondary Small*/}
        <div
          style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px" }}
        >
          <h2>Secondary Small:</h2>
          <span>Default</span>
          <Button variant={"secondary"} small={true} className="!text-black !border-black">
            Button
          </Button>
          <span>Deactivated</span>
          <Button
            variant={"secondary"}
            small={true}
            className="!text-black !border-black"
            disabled={true}
          >
            Button
          </Button>
        </div>

        {/* Secondary Destructive*/}
        <div
          style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px" }}
        >
          <h2>Secondary Destructive:</h2>
          <span>Default</span>
          <Button variant={"secondary"} destructive={true}>
            Button
          </Button>
          <span>Deactivated</span>
          <Button variant={"secondary"} destructive={true} disabled={true}>
            Button
          </Button>
        </div>

        {/* Secondary Small Destructive*/}
        <div
          style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px" }}
        >
          <h2>Secondary Small Destructive:</h2>
          <span>Default</span>
          <Button variant={"secondary"} destructive={true} small={true}>
            Button
          </Button>
          <span>Deactivated</span>
          <Button variant={"secondary"} destructive={true} small={true} disabled={true}>
            Button
          </Button>
        </div>

        {/* Destructive*/}
        <div
          style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px" }}
        >
          <h2>Destructive:</h2>
          <span>Default</span>
          <Button destructive={true}>Button</Button>
          <span>Deactivated</span>
          <Button destructive={true} disabled={true}>
            Button
          </Button>
        </div>

        {/* Destructive small*/}
        <div
          style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px" }}
        >
          <h2>Destructive small:</h2>
          <span>Default</span>
          <Button destructive={true} small={true}>
            Button
          </Button>
          <span>Deactivated</span>
          <Button destructive={true} small={true} disabled={true}>
            Button
          </Button>
        </div>
      </div>

      {/* Text Fields */}
      <h1 style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        Text Fields
      </h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "20px",
        }}
      >
        <div style={{ width: "288px" }}>
          <TextField label="Default Input" placeholder="Type here..." />
        </div>
        <div style={{ width: "440px" }}>
          <TextField
            label="Input with Caption"
            placeholder="Type here..."
            caption="Caption text here"
          />
        </div>
        <div style={{ width: "440px" }}>
          <TextField label="Error Text" placeholder="Type here..." errorText="Error Message" />
        </div>
        <div style={{ width: "440px" }}>
          <TextField label="Disabled input" placeholder="Type here..." disabled={true} />
        </div>

        <div style={{ width: "440px" }}>
          <TextArea label="Message" placeholder="Write your message here..." />
        </div>
      </div>

      {/* Checkboxes */}
      <h1 style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        Checkboxes
      </h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "20px",
        }}
      >
        {/* Default Checkbox */}
        <div style={{ width: "288px" }}>
          <Checkbox id="checkbox-default" label="Default Checkbox" />
        </div>

        {/* Checked Checkbox */}
        <div style={{ width: "288px" }}>
          <Checkbox id="checkbox-checked" label="Checked Checkbox" />
        </div>

        {/* Disabled Checkbox */}
        <div style={{ width: "288px" }}>
          <Checkbox id="checkbox-disabled" label="Disabled Checkbox" disabled={true} />
        </div>

        {/* Checkbox with Error */}
        <div style={{ width: "288px" }}>
          <Checkbox
            id="checkbox-error"
            label="Checkbox with Error"
            errorText={"Error: Selection required"}
          />
        </div>
      </div>

      {/* Radios */}
      <h1 style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>Radios</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "20px",
        }}
      >
        {/* Default Checkbox */}
        <div style={{ width: "288px" }}>
          <Radio id="radio-default" label="Default Checkbox" checked={false} />
        </div>

        {/* Checked Checkbox */}
        <div style={{ width: "288px" }}>
          <Radio id="radio-checked" label="Checked Checkbox" />
        </div>

        {/* Disabled Checkbox */}
        <div style={{ width: "288px" }}>
          <Radio id="radio-disabled" label="Disabled Checkbox" disabled={true} />
        </div>

        {/* Checkbox with Error */}
        <div style={{ width: "288px" }}>
          <Radio
            id="radio-error"
            label="Checkbox with Error"
            errorText={"Error: Selection required"}
          />
        </div>
      </div>
    </div>
  );
}
