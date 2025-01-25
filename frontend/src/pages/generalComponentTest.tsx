import { Button } from "../components/Button";
// import { Checkbox } from "../components/Checkbox";
import { TextField } from "../components/TextField";

export default function generalComponentTest() {
  return (
    <div>
      <h1 style={{ display: "flex", justifyContent: "center", alignItems: "center" }}> Buttons </h1>
      {/* Default button */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px" }}>
        <h2>Default:</h2>
        <span>Default</span>
        <Button label="Button" />
        <span>Deactivated</span>
        <Button label="Button" disabled />
      </div>

      {/* Default small */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px" }}>
        <h2>Default Small:</h2>
        <span>Default</span>
        <Button label="Button" size="small" />
        <span>Deactivated</span>
        <Button label="Button" size="small" disabled />
      </div>

      {/* Secondary */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px" }}>
        <h2>Secondary:</h2>
        <span>Default</span>
        <Button label="Button" kind="secondary" />
        <span>Deactivated</span>
        <Button label="Button" kind="secondary" disabled />
      </div>

      {/* Secondary small */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px" }}>
        <h2>Secondary Small:</h2>
        <span>Default</span>
        <Button label="Button" kind="secondary" size="small" />
        <span>Deactivated</span>
        <Button label="Button" kind="secondary" size="small" disabled />
      </div>

      {/* Destructive */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px" }}>
        <h2>Destructive:</h2>
        <span>Default</span>
        <Button label="Button" kind="destructive" />
        <span>Deactivated</span>
        <Button label="Button" kind="destructive" disabled />
      </div>

      {/* Destructive small */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px" }}>
        <h2>Destructive Small:</h2>
        <span>Default</span>
        <Button label="Button" kind="destructive" size="small" />
        <span>Deactivated</span>
        <Button label="Button" kind="destructive" size="small" disabled />
      </div>

      {/* Secondary Destructive */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px" }}>
        <h2>Secondary Destructive:</h2>
        <span>Default</span>
        <Button label="Button" kind="secondary-destructive" />
        <span>Deactivated</span>
        <Button label="Button" kind="secondary-destructive" disabled />
      </div>

      {/* Secondary Destructive small */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px" }}>
        <h2>Secondary Destructive Small:</h2>
        <span>Default</span>
        <Button label="Button" kind="secondary-destructive" size="small" />
        <span>Deactivated</span>
        <Button label="Button" kind="secondary-destructive" size="small" disabled />
      </div>

      {/* Text Fields */}
      <h1 style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        Text Fields
      </h1>
      <div
        style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "20px" }}
      >
        {/* Normal Input */}
        <div style={{ width: "288px" }}>
          <TextField label="Normal Input" placeholder="Type here..." caption="Caption text here" />
        </div>

        {/* Input with Caption */}
        <div style={{ width: "440px" }}>
          <TextField
            label="Input with Caption"
            placeholder="Type here..."
            caption="Caption text here"
          />
        </div>

        {/* Error Input */}
        <div style={{ width: "440px" }}>
          <TextField
            label="Error Input"
            placeholder="Type here..."
            hasError={true}
            errorMessage="Error messages have no ending punctuation"
          />
        </div>
      </div>
      {/* Text Fields */}
      <h1 style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        Checkboxes and Radios
      </h1>
    </div>
  );
}
