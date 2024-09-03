import User from "../models/UserModel.js";
import argon2 from "argon2";

export const getUsers = async (req, res) => {
    try {
        const response = await User.findAll({
            attributes: ['id', 'phone', 'name', 'email', 'role']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const getUserById = async (req, res) => {
    try {
        const response = await User.findOne({
            attributes: ['id', 'name', 'email', 'role', 'phone'],
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
export const createUser = async (req, res) => {
    const { name, phone, email, password, confPassword } = req.body;
    const role = "pengunjung";

    // Validasi panjang password minimal 8 karakter
    if (password.length < 8) {
        return res.status(400).json({ msg: "Password must be at least 8 characters long" });
    }

    if (password !== confPassword) {
        return res.status(400).json({ msg: "Password and Confirm Password do not match" });
    }

    const hashPassword = await argon2.hash(password);

    try {
        // Check if name, email, or phone already exists
        const nameExists = await User.findOne({ where: { name } });
        if (nameExists) {
            return res.status(400).json({ msg: "Name has been used" });
        }

        const emailExists = await User.findOne({ where: { email } });
        if (emailExists) {
            return res.status(400).json({ msg: "Email has been used" });
        }

        const phoneExists = await User.findOne({ where: { phone } });
        if (phoneExists) {
            return res.status(400).json({ msg: "Phone number has been used" });
        }

        await User.create({
            name: name,
            email: email,
            password: hashPassword,
            phone: phone,
            role: role
        });

        res.status(201).json({ msg: "Registration Successful" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}



export const updateUser = async (req, res) => {
    const user = await User.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
    const { name, phone, email, password, confPassword, role } = req.body;
    let hashPassword;
    if (password === "" || password === null) {
        hashPassword = user.password
    } else {
        hashPassword = await argon2.hash(password);
    }
    if (password !== confPassword) return res.status(400).json({ msg: "Password dan Confirm Password tidak cocok" });
    try {
        await User.update({
            name: name,
            email: email,
            phone: phone,
            password: hashPassword,
            role: role
        }, {
            where: {
                id: user.id
            }
        });
        res.status(200).json({ msg: "User Updated" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const updateUserRole = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!user) return res.status(404).json({ msg: "User not found" });

        await User.update({ role: 'pembeli' }, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ msg: "User role updated to pembeli" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};


export const deleteUser = async (req, res) => {
    const user = await User.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
    try {
        await User.destroy({
            where: {
                id: user.id
            }
        });
        res.status(200).json({ msg: "User Deleted" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}