"use client";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

import http from "@/utils/http";
import { endpoints } from "@/utils/endpoints";
import { MainContext } from "@/store/context";
import { useFetchCategories } from "@/hooks/useFetchCategories";
import { CONTACT, PRODUCT_FALLBACKS, whatsappHref } from "@/data/site";
// Same predefined OTP page/component used by signup + the login dialog
// (src/components/forms/otp.js). We reuse it as-is here instead of
// re-implementing OTP verification inline in this form.
import OTPForm from "@/components/forms/otp";

// ─── CONTACT FORM ────────────────────────────────────────────────────────────
// Posts to the same /queries endpoint the /contact page already uses.

const createQuery = async (payload) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const { data } = await axios.post(
    `${baseUrl}${endpoints.queries.getAll}`,
    payload,
  );
  return data;
};

// Same "send otp" endpoint/function used by SignUpForm before it hands off
// to <OTPForm /> (utils/endpoints.js -> otp.send).
const sendPhoneOtp = async (payload) => {
  return await http().post(endpoints.otp.send, payload);
};

const inputStyle = {
  width: "100%",
  background: "rgba(255,255,255,0.07)",
  border: "1.5px solid rgba(255,255,255,0.15)",
  borderRadius: 3,
  color: "#fff",
  padding: "13px 16px",
  fontSize: 14.5,
  fontFamily: "var(--font-body)",
  outline: "none",
  transition: "border-color 0.2s",
  boxSizing: "border-box",
};

const labelStyle = {
  display: "block",
  color: "#94a3b8",
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  marginBottom: 6,
};

const errorStyle = { color: "#fca5a5", fontSize: 12, marginTop: 4 };

// <OTPForm /> is styled for its normal light/white home (the auth pages,
// the login dialog), so we give it a matching white card here rather than
// force it onto the dark contact-section background.
const otpCardStyle = {
  background: "#fff",
  borderRadius: 6,
  overflow: "hidden",
};

const backLinkStyle = {
  background: "transparent",
  border: "none",
  color: "#0f2444",
  opacity: 0.7,
  fontSize: 12.5,
  fontWeight: 700,
  letterSpacing: "0.04em",
  textTransform: "uppercase",
  cursor: "pointer",
  padding: 0,
};

const focusOn = (e) => (e.target.style.borderColor = "#F95001");
const focusOff = (e) => (e.target.style.borderColor = "rgba(255,255,255,0.15)");

export default function Contact() {
  const { user } = useContext(MainContext);
  const { data: categories } = useFetchCategories();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      company: "",
      pincode: "",
      email: "",
      phone: "",
      requirement: "",
      message: "",
    },
  });

  // Prefill for logged-in users, same behaviour as the /contact page form.
  useEffect(() => {
    if (!user) return;
    if (user.name) setValue("name", user.name);
    if (user.email) setValue("email", user.email);
    if (user.phone) setValue("phone", user.phone);
  }, [user, setValue]);

  // ─── Two-step flow: fill form -> OTP page -> submit to /queries ───────────
  // "form"  = the enquiry fields below
  // "otp"   = the predefined <OTPForm /> page (src/components/forms/otp.js)
  const [step, setStep] = useState("form");
  const [otpRequestId, setOtpRequestId] = useState(null);
  // Snapshot of the validated form values, taken at submit time and reused
  // once OTP verification succeeds (the enquiry itself isn't created until
  // then).
  const [pendingValues, setPendingValues] = useState(null);

  const sendOtpMutation = useMutation(sendPhoneOtp, {
    onSuccess: (data) => {
      setOtpRequestId(data?.request_id);
      setStep("otp");
      toast.success(data?.message || "OTP sent to your mobile number.");
    },
    onError: (error) => {
      toast.error(error?.message || "Could not send OTP. Please try again.");
    },
  });

  const createMutation = useMutation(createQuery, {
    onSuccess: () => {
      toast.success("Enquiry sent — our team will reach out within 24 hours.");
      reset();
      setPendingValues(null);
      setOtpRequestId(null);
      setStep("form");
    },
    onError: (error) => {
      toast.error(
        error?.message || "Could not send your enquiry. Please try again.",
      );
    },
  });

  // Step 1: validate + capture the form, then send the OTP and move to the
  // OTP page — nothing is submitted to /queries yet.
  const onSubmit = (values) => {
    setPendingValues(values);
    sendOtpMutation.mutate({ phone: values.phone, name: values.name });
  };

  // Step 2: called by <OTPForm onVerified /> once the phone is verified.
  // Only now do we actually create the enquiry via the API.
  const handleVerified = () => {
    if (!pendingValues) return;
    createMutation.mutate({
      name: pendingValues.name,
      company: pendingValues.company,
      pincode: pendingValues.pincode,
      email: pendingValues.email,
      phone: pendingValues.phone,
      type: "buy",
      message: `Requirement: ${pendingValues.requirement}\n\n${pendingValues.message || "—"}`,
    });
  };

  const handleEditDetails = () => setStep("form");

  // Real categories when the API responds, otherwise the static list.
  const requirementOptions = categories?.length
    ? categories.map((c) => c.name)
    : PRODUCT_FALLBACKS.map((p) => p.name);

  const isSendingOtp = sendOtpMutation.isLoading;
  const isCreatingQuery = createMutation.isLoading;

  return (
    <section
      id="contact"
      style={{
        padding: "96px 24px",
        background:
          "linear-gradient(135deg, #091830 0%, #0f2444 50%, #162d54 100%)",
      }}
    >
      <div
        style={{
          maxWidth: 1320,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 80,
          alignItems: "start",
        }}
        className="contact-grid"
      >
        {/* Left info */}
        <div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 20,
            }}
          >
            <div style={{ width: 28, height: 2, background: "#F95001" }} />
            <span className="label-tag" style={{ color: "#F95001" }}>
              Get in Touch
            </span>
          </div>
          <h2
            className="section-heading"
            style={{
              fontSize: "clamp(38px, 5vw, 60px)",
              color: "#fff",
              lineHeight: 1.05,
              marginBottom: 24,
            }}
          >
            Request
            <br />
            <span style={{ color: "#F95001" }}>a Quote</span>
          </h2>
          <p
            style={{
              color: "#94a3b8",
              fontSize: 16,
              lineHeight: 1.75,
              marginBottom: 48,
              maxWidth: 460,
            }}
          >
            Share your project requirements — our infrastructure specialists
            will respond with a tailored supply proposal within 24 hours.
          </p>

          <ContactLine icon="📍" label="Registered Office">
            {CONTACT.address}
          </ContactLine>
          <ContactLine icon="📞" label="Phone">
            <a href={CONTACT.phoneHref} style={{ color: "#cbd5e1" }}>
              {CONTACT.phone}
            </a>
            {" · "}
            <a
              href={whatsappHref()}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#25D366" }}
            >
              WhatsApp
            </a>
          </ContactLine>
          <ContactLine icon="✉️" label="Email">
            <a href={CONTACT.emailHref} style={{ color: "#cbd5e1" }}>
              {CONTACT.email}
            </a>
          </ContactLine>
          <ContactLine icon="🕘" label="Working Hours">
            {CONTACT.hours}
          </ContactLine>
        </div>

        {/* Form */}
        <div
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1.5px solid rgba(255,255,255,0.1)",
            borderRadius: 6,
            padding: "40px 36px",
          }}
        >
          {createMutation.isSuccess ? (
            <div style={{ textAlign: "center", padding: "48px 0" }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 26,
                  color: "#F95001",
                  textTransform: "uppercase",
                  marginBottom: 12,
                }}
              >
                Request Submitted!
              </h3>
              <p style={{ color: "#94a3b8", fontSize: 15, marginBottom: 24 }}>
                Our team will reach out within 24 hours.
              </p>
              <button
                type="button"
                onClick={() => createMutation.reset()}
                style={{
                  background: "transparent",
                  border: "1.5px solid rgba(255,255,255,0.25)",
                  color: "#cbd5e1",
                  padding: "10px 22px",
                  borderRadius: 3,
                  cursor: "pointer",
                  fontSize: 13,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                Send another enquiry
              </button>
            </div>
          ) : step === "form" ? (
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 16,
                  marginBottom: 16,
                }}
                className="contact-row"
              >
                <div>
                  <label style={labelStyle}>Full Name *</label>
                  <input
                    style={inputStyle}
                    placeholder="Rajesh Kumar"
                    onFocusCapture={focusOn}
                    onBlurCapture={focusOff}
                    {...register("name", { required: "Name is required" })}
                  />
                  {errors.name && (
                    <span style={errorStyle}>{errors.name.message}</span>
                  )}
                </div>
                <div>
                  <label style={labelStyle}>Phone *</label>
                  <input
                    type="tel"
                    inputMode="numeric"
                    style={inputStyle}
                    placeholder="98100 00000"
                    onFocusCapture={focusOn}
                    onBlurCapture={focusOff}
                    {...register("phone", {
                      required: "Phone is required",
                      pattern: {
                        value: /^[0-9+\-\s()]{10,15}$/,
                        message: "Enter a valid phone number",
                      },
                    })}
                  />
                  {errors.phone && (
                    <span style={errorStyle}>{errors.phone.message}</span>
                  )}
                  <span
                    style={{
                      display: "block",
                      color: "#64748b",
                      fontSize: 11.5,
                      marginTop: 6,
                    }}
                  >
                    We&apos;ll text an OTP to this number to verify your
                    enquiry.
                  </span>
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 16,
                  marginBottom: 16,
                }}
                className="contact-row"
              >
                <div>
                  <label style={labelStyle}>Company *</label>
                  <input
                    style={inputStyle}
                    placeholder="Apex Constructions Pvt Ltd"
                    onFocusCapture={focusOn}
                    onBlurCapture={focusOff}
                    {...register("company", {
                      required: "Company is required",
                    })}
                  />
                  {errors.company && (
                    <span style={errorStyle}>{errors.company.message}</span>
                  )}
                </div>
                <div>
                  <label style={labelStyle}>Delivery Pincode *</label>
                  <input
                    inputMode="numeric"
                    style={inputStyle}
                    placeholder="121007"
                    onFocusCapture={focusOn}
                    onBlurCapture={focusOff}
                    {...register("pincode", {
                      required: "Pincode is required",
                      pattern: {
                        value: /^[1-9][0-9]{5}$/,
                        message: "Enter a valid 6-digit pincode",
                      },
                    })}
                  />
                  {errors.pincode && (
                    <span style={errorStyle}>{errors.pincode.message}</span>
                  )}
                </div>
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>Email Address *</label>
                <input
                  type="email"
                  style={inputStyle}
                  placeholder="rajesh@company.com"
                  onFocusCapture={focusOn}
                  onBlurCapture={focusOff}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Enter a valid email address",
                    },
                  })}
                />
                {errors.email && (
                  <span style={errorStyle}>{errors.email.message}</span>
                )}
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>Requirement *</label>
                <select
                  style={{ ...inputStyle, cursor: "pointer" }}
                  onFocusCapture={focusOn}
                  onBlurCapture={focusOff}
                  {...register("requirement", {
                    required: "Please select a category",
                  })}
                >
                  <option value="" style={{ background: "#0f2444" }}>
                    Select a Category
                  </option>
                  {requirementOptions.map((name) => (
                    <option
                      key={name}
                      value={name}
                      style={{ background: "#0f2444" }}
                    >
                      {name}
                    </option>
                  ))}
                  <option
                    value="Other / Multiple"
                    style={{ background: "#0f2444" }}
                  >
                    Other / Multiple
                  </option>
                </select>
                {errors.requirement && (
                  <span style={errorStyle}>{errors.requirement.message}</span>
                )}
              </div>

              <div style={{ marginBottom: 28 }}>
                <label style={labelStyle}>Project Details</label>
                <textarea
                  rows={4}
                  style={{
                    ...inputStyle,
                    resize: "vertical",
                    lineHeight: 1.65,
                  }}
                  placeholder="Describe your project, quantities, delivery location, and timeline..."
                  onFocusCapture={focusOn}
                  onBlurCapture={focusOff}
                  {...register("message")}
                />
              </div>

              <p
                style={{
                  color: "#64748b",
                  fontSize: 12.5,
                  marginBottom: 12,
                  textAlign: "center",
                }}
              >
                We&apos;ll send a one-time code to verify your number before
                the enquiry is submitted.
              </p>

              <button
                type="submit"
                disabled={isSendingOtp}
                style={{
                  width: "100%",
                  background: isSendingOtp
                    ? "rgba(249,80,1,0.55)"
                    : "linear-gradient(135deg,#F95001,#d94401)",
                  color: "#091830",
                  fontFamily: "var(--font-display)",
                  fontWeight: 800,
                  fontSize: 16,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  border: "none",
                  borderRadius: 3,
                  padding: "16px 0",
                  cursor: isSendingOtp ? "not-allowed" : "pointer",
                  transition: "opacity 0.2s",
                }}
              >
                {isSendingOtp ? "Sending OTP…" : "Continue to Verify Mobile →"}
              </button>
            </form>
          ) : (
            <div style={otpCardStyle}>
              <div
                style={{
                  padding: "24px 28px 0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <button
                  type="button"
                  onClick={handleEditDetails}
                  style={backLinkStyle}
                >
                  ← Edit details
                </button>
              </div>
              <p
                style={{
                  padding: "10px 28px 0",
                  color: "#475569",
                  fontSize: 13,
                  lineHeight: 1.6,
                }}
              >
                We&apos;ve sent a 6-digit code to{" "}
                <strong>{pendingValues?.phone}</strong>. Enter it below to
                confirm and submit your enquiry.
              </p>

              <OTPForm
                phone={pendingValues?.phone}
                requestId={otpRequestId}
                setRequestId={setOtpRequestId}
                name={pendingValues?.name}
                onVerified={handleVerified}
              />

              {isCreatingQuery && (
                <p
                  style={{
                    padding: "0 28px 24px",
                    color: "#475569",
                    fontSize: 13,
                  }}
                >
                  Mobile verified — submitting your enquiry…
                </p>
              )}

              {createMutation.isError && (
                <div style={{ padding: "0 28px 24px" }}>
                  <p style={{ color: "#dc2626", fontSize: 12.5, marginBottom: 8 }}>
                    Mobile verified, but we couldn&apos;t submit your enquiry.
                  </p>
                  <button
                    type="button"
                    onClick={handleVerified}
                    style={backLinkStyle}
                  >
                    Try submitting again
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
        @media (max-width: 520px) {
          .contact-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function ContactLine({ icon, label, children }) {
  return (
    <div style={{ display: "flex", gap: 16, marginBottom: 28 }}>
      <div style={{ fontSize: 20, marginTop: 2 }}>{icon}</div>
      <div>
        <div
          style={{
            color: "#F95001",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: 4,
          }}
        >
          {label}
        </div>
        <div style={{ color: "#cbd5e1", fontSize: 14.5, lineHeight: 1.6 }}>
          {children}
        </div>
      </div>
    </div>
  );
}
