/**
 * Copyright (c) 2015 - The CM Authors <legal@clickmatcher.com>
 *   All Rights Reserved.
 *
 * This file is CONFIDENTIAL -- Distribution or duplication of this material or
 * the information contained herein is strictly forbidden unless prior written
 * permission is obtained.
 */
#pragma once
#include "stx/stdtypes.h"
#include "zbase/Report.h"

using namespace stx;

namespace cm {

class RecoEngineStatsReport : public dproc::BlobRDD {
public:

  RecoEngineStatsReport(const ReportParams& params);

  RefPtr<VFSFile> computeBlob(dproc::TaskContext* context) override;
  List<dproc::TaskDependency> dependencies() const override;

  String contentType() const override;

protected:
  ReportParams params_;
};

} // namespace cm