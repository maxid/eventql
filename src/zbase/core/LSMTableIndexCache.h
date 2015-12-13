/**
 * Copyright (c) 2015 - zScale Technology GmbH <legal@zscale.io>
 *   All Rights Reserved.
 *
 * Authors:
 *   Paul Asmuth <paul@zscale.io>
 *
 * This file is CONFIDENTIAL -- Distribution or duplication of this material or
 * the information contained herein is strictly forbidden unless prior written
 * permission is obtained.
 */
#pragma once
#include <stx/stdtypes.h>
#include <stx/autoref.h>
#include <zbase/core/LSMTableIndex.h>

using namespace stx;

namespace zbase {

class LSMTableIndexCache : public RefCounted {
public:

  LSMTableIndexCache(const String& base_path);

  RefPtr<LSMTableIndex> lookup(const String& filename);

  void flush(const String& filename);

protected:
  const String base_path_;
};

} // namespace zbase

