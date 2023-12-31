const Project = require("./projectModel");
const AppError = require("../error_handlers/appError");
const catchAsync = require("../error_handlers/catchAsync");
const Paginator = require("../utils/pagination");
const Utility = require("../utils/utility");

exports.getProjects = catchAsync(async (req, res, next) => {
  try {
    const projects = await Project.find({ user: req.user });
    const { page, pageSize } = req.query;
    const paginator = new Paginator(
      projects,
      page,
      pageSize,
      Utility.endPoint(req.originalUrl)
    );
    const data = paginator.paginate();
    res.status(200).json({
      status: "200_OK",
      data,
    });
  } catch (err) {
    next(new AppError(err, 400));
  }
});

exports.getProject = catchAsync(async (req, res, next) => {
  try {
    const id = req.params.id;
    const project = await Project.findById(id);
    res.status(200).json({
      status: "200_Ok",
      data: {
        project,
      },
    });
  } catch (err) {
    next(new AppError(err, 400));
  }
});

exports.createProject = catchAsync(async (req, res, next) => {
  try {
    const name = req.body.name;
    const user = req.user;
    const project = await Project.create({
      name: name,
      user: user,
    });
    const requestUrl = `http://127.0.0.1:3000/objects/project/${project.id}`;
    res.status(201).json({
      status: "201_CREATED",
      data: {
        requestUrl,
        project,
      },
    });
  } catch (err) {
    next(new AppError(err, 400));
  }
});

exports.updateProject = catchAsync(async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const updatedProject = await Project.findOneAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    res.status(201).json({
      status: "201_CONTENT_UPDATED",
      data: {
        updatedProject,
      },
    });
  } catch (err) {
    next(new AppError(err, 400));
  }
});

exports.deleteProject = catchAsync(async (req, res, next) => {
  try {
    const id = req.params.id;
    const project = await Project.findByIdAndDelete(id);
    if (!project) {
      next(new AppError("Not Found", 404));
    }
    res.status(204).json({
      status: "THE CONTENT IS BEING DELETED",
      data: {
        message: "Deleted content",
      },
    });
  } catch (err) {
    next(new AppError(err, 400));
  }
});
