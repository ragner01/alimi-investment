const bcrypt = require('bcrypt');

// In-memory storage for users (temporary solution)
let users = [];
let nextId = 1;

class User {
  constructor(data) {
    this._id = nextId++;
    this.name = data.name;
    this.email = data.email;
    this.password = data.password;
    this.isAdmin = data.isAdmin || false;
    this.isKYCVerified = data.isKYCVerified || false;
    this.kycDocs = data.kycDocs || [];
    this.createdAt = new Date();
  }

  async save() {
    // Hash password before saving
    if (this.password && !this.password.startsWith('$2b$')) {
      this.password = await bcrypt.hash(this.password, 10);
    }
    users.push(this);
    return this;
  }

  static async findOne(query) {
    return users.find(user => {
      if (query.email) return user.email === query.email;
      if (query._id) return user._id === query._id;
      return false;
    });
  }

  static async findById(id) {
    return users.find(user => user._id === parseInt(id));
  }

  async comparePassword(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
  }

  toJSON() {
    const { password, ...userWithoutPassword } = this;
    return userWithoutPassword;
  }
}

module.exports = User; 