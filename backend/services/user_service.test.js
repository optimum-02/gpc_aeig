const { UserService } = require("./user_service");

describe('UserService', () => {
  let userService;
  let mockUserDAO;
  let mockAuthService;
  const mockUser = {
    id: '123',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    password: 'hashed_password',
    role: 'membre'
  };
  ///mock user response
  const user = {
    id: '123',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    role: 'membre'
  };

  beforeEach(() => {
    mockUserDAO = {
      findByEmail: jest.fn(),
      createUser: jest.fn(),
    };

    mockAuthService = {
      hashPassword: jest.fn(),
      comparePassword: jest.fn(),
      generateToken: jest.fn(),
    };

    userService = new UserService({ userDao: mockUserDAO, authService: mockAuthService });
  });

  it('devrait inscrire un utilisateur et retourner un token JWT et le user', async () => {
    mockAuthService.hashPassword.mockResolvedValue('hashed_password');
    mockUserDAO.createUser.mockResolvedValue(mockUser);
    mockAuthService.generateToken.mockReturnValue('fake_token');

    const result = await userService.signup('John', 'Doe', 'john.doe@example.com', 'password123', 'membre');

    expect(mockAuthService.hashPassword).toHaveBeenCalledWith('password123');
    expect(mockUserDAO.createUser).toHaveBeenCalledWith(expect.objectContaining({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'hashed_password',
      role: 'membre'
    }));
    expect(mockAuthService.generateToken).toHaveBeenCalledWith(mockUser);
    expect(result).toEqual({ token: 'fake_token', user });
  });

  it('devrait authentifier un utilisateur et retourner un token JWT et le user', async () => {
    mockUserDAO.findByEmail.mockResolvedValue(mockUser);
    mockAuthService.comparePassword.mockResolvedValue(true);
    mockAuthService.generateToken.mockReturnValue('fake_token');

    const result = await userService.login('john.doe@example.com', 'password123');

    expect(mockUserDAO.findByEmail).toHaveBeenCalledWith('john.doe@example.com');
    expect(mockAuthService.comparePassword).toHaveBeenCalledWith('password123', mockUser.password);
    expect(mockAuthService.generateToken).toHaveBeenCalledWith(mockUser);
    expect(result).toEqual({ token: 'fake_token', user });
  });

  it('devrait échouer si le mot de passe est incorrect', async () => {
    mockUserDAO.findByEmail.mockResolvedValue(mockUser);
    mockAuthService.comparePassword.mockResolvedValue(false);

    await expect(userService.login('john.doe@example.com', 'wrongpassword')).rejects.toThrow('Invalid credentials');
  });
});
