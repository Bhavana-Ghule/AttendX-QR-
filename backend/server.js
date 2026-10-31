const express = require("express");
const cors = require("cors");
const pool = require("./db");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());


// =====================================================
// TEST ROUTE
// =====================================================

app.get("/", (req, res) => {
    res.json({
        message: "AttendX backend is running!"
    });
});


// =====================================================
// TEST DATABASE CONNECTION
// =====================================================

app.get("/api/test-db", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT 1 AS result");

        res.json({
            success: true,
            message: "MySQL connected successfully",
            data: rows
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "MySQL connection failed",
            error: error.message
        });
    }
});


// =====================================================
// LECTURES
// =====================================================

// GET all lectures
app.get("/api/lectures", async (req, res) => {

    try {

        const [rows] = await pool.query(`
            SELECT
                id,
                lecture_id,
                lecture_name,
                lecture_date,
                lecture_time,
                created_at
            FROM lectures
            ORDER BY created_at DESC
        `);

        res.json(rows);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to fetch lectures"
        });
    }
});


// CREATE lecture
app.post("/api/lectures", async (req, res) => {

    try {

        const {
            lecture_name,
            lecture_date,
            lecture_time
        } = req.body;

        if (!lecture_name || !lecture_date || !lecture_time) {

            return res.status(400).json({
                message: "Lecture name, date and time are required"
            });
        }

        const lecture_id = "LEC-" + Date.now();

        const [result] = await pool.query(
            `
            INSERT INTO lectures
            (
                lecture_id,
                lecture_name,
                lecture_date,
                lecture_time
            )
            VALUES (?, ?, ?, ?)
            `,
            [
                lecture_id,
                lecture_name,
                lecture_date,
                lecture_time
            ]
        );

        const [rows] = await pool.query(
            `
            SELECT *
            FROM lectures
            WHERE id = ?
            `,
            [result.insertId]
        );

        res.status(201).json(rows[0]);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to create lecture"
        });
    }
});


// DELETE lecture
app.delete("/api/lectures/:lectureId", async (req, res) => {

    try {

        const { lectureId } = req.params;

        const [result] = await pool.query(
            `
            DELETE FROM lectures
            WHERE lecture_id = ?
            `,
            [lectureId]
        );

        if (result.affectedRows === 0) {

            return res.status(404).json({
                message: "Lecture not found"
            });
        }

        res.json({
            message: "Lecture deleted successfully"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to delete lecture"
        });
    }
});


// =====================================================
// ATTENDANCE
// =====================================================

// GET attendance
app.get("/api/attendance", async (req, res) => {

    try {

        const [rows] = await pool.query(`
            SELECT
                a.id,
                a.lecture_id,
                a.student_name,
                a.student_id,
                a.check_in_time,
                a.created_at,
                l.lecture_name
            FROM attendance a
            LEFT JOIN lectures l
                ON a.lecture_id = l.lecture_id
            ORDER BY a.check_in_time DESC
        `);

        res.json(rows);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to fetch attendance"
        });
    }
});


// MARK ATTENDANCE
app.post("/api/attendance", async (req, res) => {

    try {

        const {
            lecture_id,
            student_name,
            student_id
        } = req.body;

        if (!lecture_id || !student_name || !student_id) {

            return res.status(400).json({
                message: "Lecture, student name and student ID are required"
            });
        }

        // Check lecture exists
        const [lecture] = await pool.query(
            `
            SELECT lecture_id
            FROM lectures
            WHERE lecture_id = ?
            `,
            [lecture_id]
        );

        if (lecture.length === 0) {

            return res.status(404).json({
                message: "Lecture not found"
            });
        }


        // Check duplicate attendance
        const [existing] = await pool.query(
            `
            SELECT id
            FROM attendance
            WHERE lecture_id = ?
            AND student_id = ?
            `,
            [
                lecture_id,
                student_id
            ]
        );

        if (existing.length > 0) {

            return res.status(409).json({
                message: "You have already marked attendance for this lecture"
            });
        }


        const [result] = await pool.query(
            `
            INSERT INTO attendance
            (
                lecture_id,
                student_name,
                student_id
            )
            VALUES (?, ?, ?)
            `,
            [
                lecture_id,
                student_name,
                student_id
            ]
        );


        const [rows] = await pool.query(
            `
            SELECT *
            FROM attendance
            WHERE id = ?
            `,
            [result.insertId]
        );


        res.status(201).json(rows[0]);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to mark attendance"
        });
    }
});


// =====================================================
// NOTES
// =====================================================

// GET notes
app.get("/api/notes", async (req, res) => {

    try {

        const [rows] = await pool.query(`
            SELECT
                n.id,
                n.lecture_id,
                n.note_title,
                n.note_content,
                n.created_at,
                l.lecture_name
            FROM notes n
            LEFT JOIN lectures l
                ON n.lecture_id = l.lecture_id
            ORDER BY n.created_at DESC
        `);

        res.json(rows);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to fetch notes"
        });
    }
});


// CREATE NOTE
app.post("/api/notes", async (req, res) => {

    try {

        const {
            lecture_id,
            note_title,
            note_content
        } = req.body;

        if (!note_title || !note_content) {

            return res.status(400).json({
                message: "Note title and content are required"
            });
        }

        const [result] = await pool.query(
            `
            INSERT INTO notes
            (
                lecture_id,
                note_title,
                note_content
            )
            VALUES (?, ?, ?)
            `,
            [
                lecture_id || null,
                note_title,
                note_content
            ]
        );


        const [rows] = await pool.query(
            `
            SELECT *
            FROM notes
            WHERE id = ?
            `,
            [result.insertId]
        );


        res.status(201).json(rows[0]);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to save note"
        });
    }
});


// DELETE NOTE
app.delete("/api/notes/:id", async (req, res) => {

    try {

        const { id } = req.params;

        const [result] = await pool.query(
            `
            DELETE FROM notes
            WHERE id = ?
            `,
            [id]
        );

        if (result.affectedRows === 0) {

            return res.status(404).json({
                message: "Note not found"
            });
        }

        res.json({
            message: "Note deleted successfully"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to delete note"
        });
    }
});


// =====================================================
// DASHBOARD
// =====================================================

app.get("/api/dashboard", async (req, res) => {

    try {

        const [[lectures]] = await pool.query(
            "SELECT COUNT(*) AS count FROM lectures"
        );

        const [[attendance]] = await pool.query(
            "SELECT COUNT(*) AS count FROM attendance"
        );

        const [[notes]] = await pool.query(
            "SELECT COUNT(*) AS count FROM notes"
        );

        res.json({
            lectures: lectures.count,
            students: attendance.count,
            notes: notes.count
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to fetch dashboard data"
        });
    }
});


// =====================================================
// START SERVER
// =====================================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(`AttendX backend running on http://localhost:${PORT}`);

});