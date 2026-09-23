"use client";

import { useId, useState } from "react";
import styles from "./PriceCalculator.module.css";

export type PriceInputs = {
  material: number;
  lossPercent: number;
  machineMinutes: number;
  machineHourlyCost: number;
  laborMinutes: number;
  laborHourlyCost: number;
  finishing: number;
  feePercent: number;
  marginPercent: number;
};

export function calculatePrice(inputs: PriceInputs) {
  if (
    Object.values(inputs).some((value) => !Number.isFinite(value) || value < 0) ||
    inputs.feePercent + inputs.marginPercent >= 100
  ) {
    return null;
  }

  const materialCost = inputs.material * (1 + inputs.lossPercent / 100);
  const machineCost = (inputs.machineMinutes / 60) * inputs.machineHourlyCost;
  const laborCost = (inputs.laborMinutes / 60) * inputs.laborHourlyCost;
  const totalCost = materialCost + machineCost + laborCost + inputs.finishing;
  const price = totalCost / (1 - (inputs.feePercent + inputs.marginPercent) / 100);
  const fees = price * (inputs.feePercent / 100);
  const profit = price - totalCost - fees;

  if (![totalCost, price, fees, profit].every(Number.isFinite)) return null;

  return { materialCost, machineCost, laborCost, totalCost, price, fees, profit };
}

type FieldName = keyof PriceInputs;
type Field = { name: FieldName; label: string; unit: string; initial: string };

const fields: Field[] = [
  { name: "material", label: "Base, película e papel", unit: "R$", initial: "1,50" },
  { name: "lossPercent", label: "Perdas de material", unit: "%", initial: "5" },
  { name: "machineMinutes", label: "Tempo de impressão", unit: "min", initial: "1" },
  { name: "machineHourlyCost", label: "Impressão / hora", unit: "R$", initial: "3,00" },
  { name: "laborMinutes", label: "Tempo de trabalho", unit: "min", initial: "1" },
  { name: "laborHourlyCost", label: "Seu trabalho / hora", unit: "R$", initial: "24,00" },
  { name: "finishing", label: "Montagem e embalagem", unit: "R$", initial: "0,30" },
  { name: "feePercent", label: "Taxas sobre a venda", unit: "%", initial: "10" },
  { name: "marginPercent", label: "Margem desejada", unit: "%", initial: "30" },
];

const initialValues = Object.fromEntries(fields.map((field) => [field.name, field.initial])) as Record<
  FieldName,
  string
>;

const currency = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

function parseDecimal(value: string): number | null {
  const trimmed = value.trim();
  if (!/^(?:\d+(?:[.,]\d*)?|[.,]\d+)$/.test(trimmed)) return null;
  const number = Number(trimmed.replace(",", "."));
  return Number.isFinite(number) && number >= 0 ? number : null;
}

function ArrowIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function PriceCalculator() {
  const id = useId();
  const [values, setValues] = useState(initialValues);
  const parsed = Object.fromEntries(
    fields.map((field) => [field.name, parseDecimal(values[field.name])]),
  ) as Record<FieldName, number | null>;
  const hasInvalidInput = Object.values(parsed).some((value) => value === null);
  const invalidRates =
    parsed.feePercent !== null &&
    parsed.marginPercent !== null &&
    parsed.feePercent + parsed.marginPercent >= 100;
  const result = hasInvalidInput ? null : calculatePrice(parsed as PriceInputs);
  const generalError = invalidRates
    ? "Taxas e margem, somadas, precisam ser menores que 100%."
    : !hasInvalidInput && !result
      ? "Esses valores são muito altos. Reduza os valores para simular."
      : null;

  return (
    <div className={styles.calculator}>
      <div className={styles.inputsPanel}>
        <div className={styles.panelHeader}>
          <div>
            <span className={styles.eyebrow}>EXPERIMENTE NA PRÁTICA</span>
            <h3 className={styles.heading}>Os custos de um botton ou ímã</h3>
          </div>
          <span className={styles.exampleBadge}>Exemplo editável</span>
        </div>
        <p className={styles.helper} id={`${id}-hint`}>
          Preencha os valores por unidade. Inclua tinta e energia no custo de impressão. Use vírgula ou ponto nos decimais.
        </p>
        <div className={styles.fields}>
          {fields.map((field) => {
            const inputId = `${id}-${field.name}`;
            const isInvalid = parsed[field.name] === null;
            const isInvalidRate = invalidRates && (field.name === "feePercent" || field.name === "marginPercent");
            const errorMessage = values[field.name].trim() === ""
              ? "Preencha este valor."
              : "Use um número igual ou maior que zero.";

            return (
              <div className={styles.field} key={field.name}>
                <label htmlFor={inputId}>{field.label}</label>
                <div className={`${styles.inputWrap} ${isInvalid || isInvalidRate ? styles.invalid : ""}`}>
                  <input
                    id={inputId}
                    name={field.name}
                    type="text"
                    inputMode="decimal"
                    autoComplete="off"
                    spellCheck={false}
                    maxLength={16}
                    value={values[field.name]}
                    aria-invalid={isInvalid || isInvalidRate}
                    aria-describedby={[
                      `${id}-hint`,
                      `${inputId}-unit`,
                      isInvalid ? `${inputId}-error` : "",
                      isInvalidRate ? `${id}-error` : "",
                    ].filter(Boolean).join(" ")}
                    onChange={(event) => setValues((previous) => ({ ...previous, [field.name]: event.target.value }))}
                  />
                  <span className={styles.unit} id={`${inputId}-unit`}>{field.unit}</span>
                </div>
                {isInvalid && <span className={styles.fieldError} id={`${inputId}-error`}>{errorMessage}</span>}
              </div>
            );
          })}
          <div className={styles.marginNote}>
            <span className={styles.noteIcon} aria-hidden="true">i</span>
            <span>A margem é calculada sobre o preço de venda.</span>
          </div>
        </div>
        {generalError && <p className={styles.generalError} id={`${id}-error`}>{generalError}</p>}
        <button className={styles.resetButton} type="button" onClick={() => setValues({ ...initialValues })}>
          Restaurar exemplo
        </button>
      </div>

      <div className={styles.resultPanel} aria-live="polite" aria-atomic="true">
        <div className={styles.resultTop}>
          <span className={styles.resultEyebrow}>SUA SIMULAÇÃO</span>
          <span className={styles.liveBadge}><span /> Em tempo real</span>
        </div>
        <div className={styles.priceBlock}>
          <span className={styles.priceLabel}>Preço sugerido por peça</span>
          <strong className={styles.price}>{result ? currency.format(result.price) : "—"}</strong>
          <span className={styles.priceCaption}>
            {result ? "Custos, taxas e margem na mesma conta." : "Revise os campos para ver o resultado."}
          </span>
        </div>
        <dl className={styles.breakdown}>
          <div><dt>Custo total por peça</dt><dd>{result ? currency.format(result.totalCost) : "—"}</dd></div>
          <div><dt>Taxas sobre a venda</dt><dd>{result ? currency.format(result.fees) : "—"}</dd></div>
          <div className={styles.profit}><dt>Lucro estimado por peça</dt><dd>{result ? currency.format(result.profit) : "—"}</dd></div>
        </dl>
        <div className={styles.formula}>
          <span className={styles.formulaIcon}><ArrowIcon /></span>
          <p>Preço = custo total ÷ (1 − taxas − margem), com os percentuais em formato decimal.</p>
        </div>
        <p className={styles.disclaimer}>
          Simulação ilustrativa. Inclua todos os custos do seu negócio e ajuste as taxas e a margem à sua realidade. O cálculo não garante vendas ou lucro.
        </p>
      </div>
    </div>
  );
}
