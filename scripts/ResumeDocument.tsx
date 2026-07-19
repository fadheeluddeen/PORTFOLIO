import React from "react";
import { Document, Page, Text, View, StyleSheet, Link } from "@react-pdf/renderer";

import {
  profile,
  summary,
  skillGroups,
  jobs,
  education,
  projectList,
  certificationItems,
  certificationsInProgress,
  achievements,
} from "../src/data/resume-data";

// Colors pulled from the same orange/teal palette as the website theme
const ORANGE = "#c05f00";
const INK = "#2a2f35";
const MUTED = "#5a6068";
const RULE = "#e2e6ea";

const styles = StyleSheet.create({
  page: {
    paddingTop: 34,
    paddingBottom: 34,
    paddingHorizontal: 40,
    fontSize: 9.5,
    fontFamily: "Helvetica",
    color: INK,
  },
  name: {
    fontSize: 20,
    fontFamily: "Helvetica-Bold",
    color: ORANGE,
    textAlign: "center",
  },
  title: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    textAlign: "center",
    marginTop: 2,
  },
  roles: {
    fontSize: 8.5,
    fontStyle: "italic",
    color: MUTED,
    textAlign: "center",
    marginTop: 3,
  },
  contactRow: {
    fontSize: 8.5,
    textAlign: "center",
    marginTop: 4,
    color: MUTED,
  },
  sectionTitle: {
    fontSize: 10.5,
    fontFamily: "Helvetica-Bold",
    color: ORANGE,
    marginTop: 11,
    marginBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: RULE,
    paddingBottom: 2,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  paragraph: {
    fontSize: 9.3,
    lineHeight: 1.4,
    color: INK,
  },
  skillRow: {
    flexDirection: "row",
    marginBottom: 2,
  },
  skillLabel: {
    fontFamily: "Helvetica-Bold",
    fontSize: 9.3,
    width: 130,
  },
  skillValue: {
    fontSize: 9.3,
    flex: 1,
  },
  jobHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
  },
  jobRole: {
    fontFamily: "Helvetica-Bold",
    fontSize: 9.8,
  },
  jobPeriod: {
    fontFamily: "Helvetica-Oblique",
    fontSize: 8.8,
    color: MUTED,
  },
  bullet: {
    flexDirection: "row",
    marginTop: 2,
    paddingLeft: 4,
  },
  bulletDot: {
    width: 8,
    fontSize: 9.3,
  },
  bulletText: {
    fontSize: 9.3,
    lineHeight: 1.35,
    flex: 1,
  },
  projectRow: {
    marginTop: 5,
  },
  projectTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 9.5,
  },
  projectTech: {
    fontSize: 8.6,
    color: ORANGE,
    fontFamily: "Helvetica-Oblique",
    marginTop: 1,
  },
  eduRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
  },
  link: {
    color: ORANGE,
  },
});

export function ResumeDocument() {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.name}>{profile.name.toUpperCase()}</Text>
        <Text style={styles.title}>{profile.title}</Text>
        <Text style={styles.roles}>{profile.roles.join("  •  ")}</Text>
        <Text style={styles.contactRow}>
          {profile.location} | {profile.phone} | {profile.email} |{" "}
          <Link style={styles.link} src={profile.linkedin}>
            LinkedIn
          </Link>{" "}
          |{" "}
          <Link style={styles.link} src={profile.github}>
            GitHub
          </Link>
        </Text>

        <Text style={styles.sectionTitle}>Professional Summary</Text>
        <Text style={styles.paragraph}>{summary}</Text>

        <Text style={styles.sectionTitle}>Technical Skills</Text>
        {skillGroups.map((group) => (
          <View key={group.title} style={styles.skillRow}>
            <Text style={styles.skillLabel}>{group.title}:</Text>
            <Text style={styles.skillValue}>{group.tags.join(", ")}</Text>
          </View>
        ))}

        <Text style={styles.sectionTitle}>Experience</Text>
        {jobs.map((job) => (
          <View key={job.company} wrap={false}>
            <View style={styles.jobHeaderRow}>
              <Text style={styles.jobRole}>
                {job.role} — {job.company}, {job.location}
              </Text>
              <Text style={styles.jobPeriod}>{job.period}</Text>
            </View>
            {job.bullets.map((b) => (
              <View key={b} style={styles.bullet}>
                <Text style={styles.bulletDot}>•</Text>
                <Text style={styles.bulletText}>{b}</Text>
              </View>
            ))}
          </View>
        ))}

        <Text style={styles.sectionTitle}>Projects</Text>
        {projectList.map((project) => (
          <View key={project.title} style={styles.projectRow} wrap={false}>
            <Text style={styles.projectTitle}>
              {project.title} — <Text style={{ fontFamily: "Helvetica" }}>{project.subtitle}</Text>
            </Text>
            <Text style={styles.bulletText}>{project.description}</Text>
            <Text style={styles.projectTech}>Tech: {project.tags.join(", ")}</Text>
          </View>
        ))}

        <Text style={styles.sectionTitle}>Certifications &amp; Learning</Text>
        <Text style={styles.bulletText}>
          {certificationItems.map((c) => c.title).join(" · ")}.
        </Text>
        <Text style={[styles.bulletText, { marginTop: 3 }]}>
          <Text style={{ fontFamily: "Helvetica-Bold" }}>Currently pursuing: </Text>
          {certificationsInProgress.join(" · ")}.
        </Text>
        <Text style={[styles.bulletText, { marginTop: 3 }]}>{achievements.join(" ")}</Text>

        <Text style={styles.sectionTitle}>Education</Text>
        {education.map((edu) => (
          <View key={edu.school} style={styles.eduRow}>
            <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 9.3 }}>{edu.school}</Text>
            <Text style={{ fontSize: 8.8, color: MUTED }}>{edu.detail}</Text>
          </View>
        ))}
      </Page>
    </Document>
  );
}
